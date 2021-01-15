<template>
	<q-page>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" icon="home"/>
				<q-breadcrumbs-el label="Monthly Order Report" icon="category"/>
			</q-breadcrumbs>
		</div>
		<q-table title="Monthly Order Report" :data="rows" :columns="columns" row-key="_id.$oid" color="amber"
				 :filter="filter" :pagination.sync="pagination" binary-state-sort wrap-cells card-class="full-width">
			<template v-slot:no-data="{ icon, message, filter }">
				<div class="full-width row flex-center text-accent q-gutter-sm text-h4 q-my-xl q-py-xl">
					<q-icon color="warning" :name="filter ? 'warning' : icon" size="2em"/>
					<span>No data to show!</span>
				</div>
			</template>
			<template v-slot:top-right>
				<q-btn
					color="primary"
					icon-right="archive"
					label="Export to xlsx"
					no-caps
					@click="exportTable"
				/>
			</template>
			<template v-slot:body-cell-items="props">
				<q-td>
					<q-item v-for="row in props.value" dense :key="Math.random()" style="border-bottom: 1px solid black" class="q-py-sm">
						<q-item-section>
							<q-item-label header class="q-pl-none q-py-none">
								{{ row.name }}
							</q-item-label>
							<q-item-label caption>
								{{ row.price }} X {{ row.quantity }} = {{ Number(row.price * row.quantity).toFixed(2) }}
							</q-item-label>
						</q-item-section>
					</q-item>
				</q-td>
			</template>
			<template v-slot:body-cell-action="props">
				<q-td :props="props">
					<q-btn icon="done_outline" @click="$root.$emit('deliveryOut', props.row)" v-if="!props.row.isDelivered"/>
				</q-td>
			</template>
		</q-table>
		<delivery/>
	</q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Loading} from "quasar";
import {Collections} from "src/interfaces/util";
import {IOrders} from "src/interfaces/IOrders";
import Delivery from "components/admin/Delivery.vue";
import moment from "moment";
import {exportFile} from 'quasar'
import * as XLSX from 'xlsx'

@Component({
	components: {Delivery}
})
export default class OrderReport extends Vue {

	filter: string = '';
	pagination: any = {
		sortBy: 'name',
		descending: false,
		page: 1,
		rowsPerPage: 10
	}

	columns: Array<any> = [
		{
			name: 'date',
			field: 'date',
			required: true,
			label: 'Order Date',
			align: 'left',
			format: (v: any) => {
				return moment(v).format('DD MMM, Y hh:mmA')
			},
			sortable: true
		},
		{
			name: 'Name',
			field: 'customer',
			required: true,
			label: 'Name',
			align: 'left',
			format: (v: any) => v[0].firstName + ' ' + v[0].lastName,
			sortable: true
		},
		{
			name: 'contact',
			field: 'customer',
			required: true,
			label: 'Email',
			align: 'left',
			format: (v: any) => v[0].email,
			sortable: true
		},
		{
			name: 'items',
			field: 'products',
			required: true,
			label: 'items',
			align: 'left',
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
			name: 'totalPrice',
			field: 'price',
			required: true,
			label: 'Total Price',
			align: 'left',
			format: (v: any) => v,
			sortable: true
		},
		{
			name: 'delivery',
			field: 'isDelivered',
			required: true,
			label: 'Delivery Status',
			align: 'left',
			format: (v: any) => v ? "Yes" : "No",
			sortable: true
		},
	]
	rows: IOrders[] = []

	created() {
		this.loadTable()
		this.$root.$on('loadOrderTable', () => {
			this.loadTable()
		})
	}

	loadTable() {
		Loading.show()
		this.$db.collection(Collections.Orders).aggregate([
			{

			},
			{
			$lookup: {
				from: Collections.USERS,
				let: {id: '$customer'},
				pipeline: [
					{$match: {$expr: {$eq: ['$userID', '$$id']}}},
					{$project: {_id: 1, firstName: 1, lastName: 1, email: 1, address: 1, contact: 1}}
				],
				as: 'customer'
			}
		},
		]).then(async rows => {
			this.rows = rows
		}).finally(() => {
			Loading.hide()
		})
	}

	exportTable() {
		let exportRows: any[] = []
		let total: number = 0
		this.rows.forEach(order => {
			let item: any = {
				// @ts-ignore
				Customer: order.customer[0].firstName + ' ' + order.customer[0].lastName,
				// @ts-ignore
				Customer_Address: order.customer[0].address,
				// @ts-ignore
				Contact_No: order.customer[0].contact,
				Order_Date: order.date,
				Total_Quantity: order.quantity,
				Price: order.price,
			}

			total += order.price

			order.products.forEach((product, n) => {
				// @ts-ignore
				item['Product ' + (n+1)] = product.name
				item['Quantity ' + (n+1)] = product.quantity
			})
			exportRows.push(item)
		})
		exportRows.push({
			// @ts-ignore
			Customer: 'Total',
			// @ts-ignore
			Customer_Address:'',
			// @ts-ignore
			Contact_No: '',
			Order_Date: '',
			Total_Quantity: '',
			Price: total,
		})
		let wb = XLSX.utils.book_new()
		let ws = XLSX.utils.json_to_sheet(exportRows)
		XLSX.utils.book_append_sheet(wb, ws, 'data')
		let wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'array'})
		let exp = exportFile('Orders.xlsx',
			wbout, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
	}


}
</script>

<style scoped>

</style>
