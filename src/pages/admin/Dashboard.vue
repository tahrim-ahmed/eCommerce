<template>
	<q-page>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" icon="home"/>
				<q-breadcrumbs-el label="Received Orders" icon="category"/>
			</q-breadcrumbs>
		</div>
		<q-table title="Received Orders" :data="rows" :columns="columns" row-key="_id.$oid" color="amber"
				 :filter="filter" :pagination.sync="pagination" binary-state-sort wrap-cells card-class="full-width">
			<template v-slot:no-data="{ icon, message, filter }">
				<div class="full-width row flex-center text-accent q-gutter-sm text-h4 q-my-xl q-py-xl">
					<q-icon color="warning" :name="filter ? 'warning' : icon" size="2em"/>
					<span>No data to show!</span>
				</div>
			</template>
			<template v-slot:top-right>
				<q-input dense debounce="300" v-model="filter" placeholder="Search">
					<template v-slot:append>
						<q-icon name="search"/>
					</template>
				</q-input>
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

@Component({
	components: {Delivery}
})
export default class Dashboard extends Vue {

	filter: string = '';
	pagination: any = {
		sortBy: 'date',
		descending: true,
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
			name: 'address',
			field: 'customer',
			required: true,
			label: 'Address',
			align: 'left',
			format: (v: any) => v[0].address,
			sortable: true
		},
		{
			name: 'contact',
			field: 'customer',
			required: true,
			label: 'Contact',
			align: 'left',
			format: (v: any) => v[0].contact,
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
		{
			name: 'received',
			field: 'isReceived',
			required: true,
			label: 'Received Status',
			align: 'left',
			format: (v: any) => v ? "Yes" : "No",
			sortable: true
		},
		{
			name: 'rating',
			field: 'rating',
			required: true,
			label: 'Rating',
			align: 'left',
			format: (v: any) => v ? v : "No",
			sortable: true
		},
		{
			name: 'action',
			field: '_id',
			label: 'Action',
			align: 'left'
		}
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
		this.$db.collection(Collections.Orders).aggregate([{
			$lookup: {
				from: Collections.USERS,
				let: {id: '$customer'},
				pipeline: [
					{$match: {$expr: {$eq: ['$userID', '$$id']}}},
					{$project: {_id: 1, firstName: 1, lastName: 1, contact: 1, address: 1}}
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
}
</script>

<style scoped>

</style>
