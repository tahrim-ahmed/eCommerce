<template>
	<q-page padding>
		<q-table grid title="Product Lists" :data="rows" :columns="columns" row-key="_id.$oid" color="amber"
				 :filter="filter" hide-header>
			<template v-slot:top-right>
				<q-input dense debounce="300" v-model="filter" placeholder="Search">
					<template v-slot:append>
						<q-icon name="search"/>
					</template>
				</q-input>
			</template>
			<template v-slot:item="{row}">
				<q-col class="col-sm-3 col-12 q-px-md">
					<q-card class="my-card full-height">
						<q-img :src="row.image" height="200px" contain/>
						<q-separator/>
						<q-card-section>
							<div class="text-h6" style="color: darkblue">{{ row.name }}</div>
							<div class="text-subtitle2">Price: {{ row.price }} BDT</div>
							<div class="text-subtitle2">In Stock: {{ row.quantity }} Units</div>
							<div class="text-subtitle2">{{ row.category.name }}</div>
						</q-card-section>
						<q-btn icon="delete">
							<q-popup-proxy persistent>
								<q-card>
									<q-card-section class="q-pb-none">
										<q-banner dense>
											<template v-slot:avatar>
												<q-icon name="warning" color="red"/>
											</template>
											You are about to delete this data!
										</q-banner>
									</q-card-section>
									<q-card-actions align="right" class="q-pt-none">
										<q-btn label="Confirm" no-caps v-close-popup @click="deleteItem(row._id)" color="red"/>
										<q-btn label="No" no-caps v-close-popup/>
									</q-card-actions>
								</q-card>
							</q-popup-proxy>
						</q-btn>
					</q-card>
				</q-col>
			</template>
		</q-table>
	</q-page>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Loading} from "quasar";
import {Collections} from "src/interfaces/util";
import {IProduct} from "src/interfaces/IProduct";

@Component
export default class Products extends Vue {
	filter: string = '';
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
			required: true,
			label: 'Action',
			align: 'left',
			sortable: true
		}
	]
	rows: any[] = []

	mounted() {
		this.loadTable()
	}

	created() {
		this.$root.$on('productsAdded', () => {
			this.loadTable()
		})
	}

	loadTable() {
		Loading.show()
		this.$db.collection(Collections.product).aggregate([{
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

	deleteItem(_id: string) {
		Loading.show()
		this.$db.collection(Collections.product).deleteOne({
			_id
		}).then(() => {
			this.$q.notify({
				message: 'Deleted Successfully!',
				type: 'positive'
			})
		}).finally(() => {
			Loading.hide()
			this.loadTable()
		})
	}

	getImage(row: IProduct) {
		console.log(row)
		if (row.image) {
			return this.$storage.child(row.image).getDownloadURL().then(value => value)
		}
	}
}
</script>

<style lang=scss>
</style>
