<template>
	<q-page>
		<q-table :data="rows" :columns="columns" row-key="_id.$oid">
			<template v-slot:body-cell-items="props">
				<q-td>
					<q-item v-for="row in props.value" dense :key="Math.random()" style="border-bottom: 1px solid black" class="q-py-sm">
						<q-item-section>
							<q-item-label header class="q-pl-none q-py-none">
								{{row.name}}
							</q-item-label>
							<q-item-label caption>
								{{ row.price }} X {{ row.quantity }} = {{ Number(row.price * row.quantity).toFixed(2) }}
							</q-item-label>
						</q-item-section>
					</q-item>
				</q-td>
			</template>
		</q-table>
	</q-page>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Collections} from "src/interfaces/util";
import {IOrders} from "src/interfaces/IOrders";
import moment from "moment";

@Component
export default class MyOrder extends Vue {


	columns: Array<any> = [
		{
			name: 'date',
			field: 'date',
			required: true,
			label: 'Order Date',
			align: 'left',
			format: (v: any) => {
				console.log(v);
				return moment(v).format('DD MMM, Y hh:mmA')
			},
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
			format: (v: any) => v? "Yes" : "No",
			sortable: true
		}
	]

	rows: IOrders[] = []

	mounted() {
		this.loadTable()
	}

	loadTable() {
		let customer = this.$store.getters.currentUser.userID
		console.log(customer);
		this.$db.collection(Collections.Orders).find({
			customer: {
				$eq: customer
			}
		}).then(rows => {
			this.rows = rows
			console.log(this.rows);
		})
	}
}
</script>

<style scoped>

</style>
