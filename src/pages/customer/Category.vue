<template>
	<q-page>
		<q-table grid title="" :data="rows" :columns="columns" row-key="_id.$oid" color="amber"
				 :filter="filter" :pagination.sync="pagination" binary-state-sort wrap-cells card-class="full-width" hide-header>
			<template v-slot:item="{row}">
				<q-col class="q-pa-xs col-xs-3 col-sm-3 col-md-3">
					<q-card class="my-card full-height cursor-pointer">
						<q-img :src="row.image" height="200px" contain @click="showDetails(row)"/>
						<q-separator/>
						<q-card-section>
							<div class="text-h6" style="color: darkblue">{{ row.name }}</div>
							<div class="text-subtitle2">Price: {{ numberWithCommas(row.price) }} BDT</div>
							<div class="text-subtitle2">In Stock: {{ row.quantity }} Units</div>
							<div class="text-subtitle2">In {{ row.category.name }}</div>
						</q-card-section>
						<q-card-section class="row">
							<q-space/>
							<q-btn class="full-width skip-btn" color="primary" icon="shopping_cart" @click="$root.$emit('addToCart',row)"/>
							<q-space/>
						</q-card-section>
					</q-card>
				</q-col>
			</template>
		</q-table>
	</q-page>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {Loading} from "quasar";
import {Collections} from "src/interfaces/util";
import {IProduct} from "src/interfaces/IProduct";
import {ICategory} from "src/interfaces/ICategory";

@Component
export default class Categories extends Vue {

	category: string = null
	subCategory: ICategory = null
	rows: any[] = []
	columns: Array<any> = [
		{
			name: 'image',
			field: 'image',
			required: true,
			label: 'Image',
			align: 'left',
			format: (v: any) => {
				if (v) {
					return this.$storage.child(v).getDownloadURL()
				} else {
					return ''
				}
			},
			sortable: true
		},
		{
			name: 'name',
			field: 'name',
			required: true,
			label: 'Name',
			align: 'left',
			format: (v: any) => v,
			sortable: true
		},
		{
			name: 'category',
			field: 'category',
			required: true,
			label: 'Category',
			align: 'left',
			format: (v: any) => v.name,
			sortable: true
		},
		{
			name: 'quantity',
			field: 'quantity',
			required: true,
			label: 'Quantity',
			align: 'left',
			format: (v: any) => v,
			sortable: true
		},
		{
			name: 'price',
			field: 'price',
			required: true,
			label: 'Price per Unit',
			align: 'left',
			format: (v: any) => v,
			sortable: true
		},
		{
			name: 'action',
			field: '_id',
			label: 'Action',
			align: 'left'
		}
	]

	filter: string = '';
	pagination: any = {
		sortBy: 'name',
		descending: false,
		page: 1,
		rowsPerPage: 20
	}

	@Watch('$route', {immediate: true})
	onChangeRoute() {
		this.category = this.$route.params.category
		console.log();
		this.$db.collection(Collections.productCategories).findOne({
			name: this.$route.params.subCategory
		}).then(value => {
			this.subCategory = value
			console.log(value);
			this.loadTable()
		})
	}


	numberWithCommas(x: any): any {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	loadTable() {
		Loading.show()
		this.$db.collection(Collections.product).aggregate([
			{
				$match: {
					category: {$eq: this.subCategory._id}
				}
			},
			{
				$project: {
					name: 1,
					category: 1,
					price: 1,
					quantity: 1,
					image: 1
				},
			}, {
				$lookup: {
					from: Collections.productCategories,
					let: {id: '$category'},
					pipeline: [
						{$match: {$expr: {$eq: ['$_id', '$$id']}}},
						{$project: {_id: 1, name: 1}}
					],
					as: 'category'
				}
			},
			{
				$project: {
					name: 1,
					image: 1,
					price: 1,
					category: {
						$arrayElemAt: ['$category', 0]
					},
					quantity: 1
				}
			}]).then(async rows => {
			this.rows = rows
			this.rows.forEach((m: IProduct) => {
				if (m.image) {
					this.$storage.child(m.image).getDownloadURL().then(v => {
						m.image = v
					})
				} else {
					m.image = '/images/cart.png'
				}
			})
		}).finally(() => {
			Loading.hide()
		})
	}

	showDetails(row: any) {
	}

}
</script>

<style scoped>

</style>
