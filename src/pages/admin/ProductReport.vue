<template>
	<q-page padding>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" icon="home"/>
				<q-breadcrumbs-el label="Product Report" icon="view_stream"/>
			</q-breadcrumbs>
		</div>
		<q-table title="" :data="rows" :columns="columns" row-key="_id.$oid" color="amber"
				 :filter="filter" :pagination.sync="pagination" binary-state-sort wrap-cells card-class="full-width">
			<template v-slot:top-right>
				<q-btn
					color="primary"
					icon-right="archive"
					label="Export to xlsx"
					no-caps
					@click="exportTable"
				/>
			</template>
		</q-table>
		<edit-product/>
	</q-page>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {exportFile, Loading} from "quasar";
import {Collections} from "src/interfaces/util";
import {IProduct} from "src/interfaces/IProduct";
import EditProduct from "components/admin/EditProduct.vue";
import * as XLSX from "xlsx";

@Component({
	components: { EditProduct}
})
export default class ProductReport extends Vue {
	filter: string = '';
	pagination: any = {
		sortBy: 'name',
		descending: false,
		page: 1,
		rowsPerPage: 20
	}

	numberWithCommas(x: any): any {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	columns: Array<any> = [
		{
			name: 'name',
			field: 'name',
			required: true,
			label: 'Product Name',
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
			label: 'Available Quantity',
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

	exportTable() {
		let exportRows: any[] = []
		this.rows.forEach(product => {
			let item: any = {
				// @ts-ignore
				Item_Name: product.name,
				// @ts-ignore
				Category_Name: product.category.name,
				// @ts-ignore
				Available_Quantity: product.quantity,
				Unit_Price: product.price,
				Total_Price: product.quantity * product.price,
			}

			exportRows.push(item)
		})
		let wb = XLSX.utils.book_new()
		let ws = XLSX.utils.json_to_sheet(exportRows)
		XLSX.utils.book_append_sheet(wb, ws, 'data')
		let wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'array'})
		let exp = exportFile('Products.xlsxs',
			wbout, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
	}

}
</script>

<style lang=scss>
</style>
