<template>
	<q-page padding>
		<q-table grid title="" :data="rows" :columns="columns" row-key="_id.$oid" color="amber"
				 :filter="filter" :pagination.sync="pagination" binary-state-sort wrap-cells card-class="full-width" hide-header>
			<template v-slot:top-right>
				<q-input dense debounce="300" v-model="filter" placeholder="Search Item or Category">
					<template v-slot:append>
						<q-icon name="search"/>
					</template>
				</q-input>
			</template>
			<template v-slot:item="{row}">
				<q-col class="q-pa-xs col-xs-3 col-sm-3 col-md-3">
					<q-card class="my-card full-height cursor-pointer">
						<q-img :src="row.image" height="200px" contain @click="$root.$emit('showProductDetails', row._id)"/>
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
		<product-details/>
	</q-page>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Loading} from "quasar";
import {Collections} from "src/interfaces/util";
import {IProduct} from "src/interfaces/IProduct";
import EditProduct from "components/admin/EditProduct.vue";
import ProductDetails from "components/customer/ProductDetails.vue";

@Component({
	components: {ProductDetails, EditProduct}
})
export default class Index extends Vue {
	filter: string = '';
	pagination: any = {
		sortBy: 'name',
		descending: false,
		page: 1,
		rowsPerPage: 20
	}

	//This method is used for displaying numbers with commas. Ex: 1,000
	numberWithCommas(x: any): any {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	//This columns will be shown in the table
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
	rows: any[] = []

	//executed by default
	mounted() {
		this.loadTable()
	}

	//after adding a new product it reloads the table
	created() {
		this.$root.$on('productsAdded', () => {
			this.loadTable()
		})
	}

	//this method is used to fetch data of products
	loadTable() {
		Loading.show()
		this.$db.collection(Collections.product).aggregate([{
			//project means select
			$project: {
				name: 1,
				category: 1,
				price: 1,
				quantity: 1,
				image: 1
			},
		}, {
			//lookup means join
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
				//project means select
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

	//this method is used for fetching product images from firebase
	getImage(row: IProduct) {
		if (row.image) {
			return this.$storage.child(row.image).getDownloadURL().then(value => value)
		}
	}

}
</script>

<style lang=scss>
</style>
