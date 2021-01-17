<template>
	<q-page>
		<q-table :data="rows" :columns="columns" row-key="_id.$oid" :pagination="pagination">
			<template v-slot:body-cell-received="props">
				<q-td :props="props">
					<q-td :props="props">
						<q-btn label="Received" v-if="(!props.row.isReceived) && (props.row.isDelivered)" dense>
							<q-popup-proxy persistent>
								<q-card>
									<q-card-section class="q-pb-none">
										<q-banner dense>
											Are you sure want to mark as Received?
										</q-banner>
									</q-card-section>
									<q-card-actions align="right" class="q-pt-none">
										<q-btn label="Yes" no-caps v-close-popup @click="submitReceived(props.row._id)" color="positive"/>
										<q-btn label="No" color="negative" no-caps v-close-popup/>
									</q-card-actions>
								</q-card>
							</q-popup-proxy>
						</q-btn>
						<div v-else>
							Received
						</div>
					</q-td>
				</q-td>
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
			<template v-slot:body-cell-rating="props">
				<q-td :props="props">
					<q-btn label="Rating" v-if="(!props.row.rating) && (props.row.isReceived)" dense>
						<q-popup-proxy persistent>
							<q-card>
								<q-card-section class="q-pb-none">
									<q-banner dense>
										Please rate us!
									</q-banner>
								</q-card-section>
								<q-card-actions align="right" class="q-pt-none">
									<q-rating
										v-model="rating"
										size="3.5em"
										color="primary"
										:max="5"
									/>
									<q-btn label="Rate" no-caps v-close-popup @click="submitRating(props.row._id)" color="positive"/>
									<q-btn label="No" color="negative" no-caps v-close-popup/>
								</q-card-actions>
							</q-card>
						</q-popup-proxy>
					</q-btn>
					<div v-else-if="props.row.rating">
						{{ props.row.rating }} ☆
					</div>
					<div v-else-if="(!props.row.rating) && (!props.row.isReceived)">
						N/A
					</div>
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
import Qcol from "components/qcol.vue";
import {Loading} from "quasar";

@Component({
	components: {Qcol}
})
export default class MyOrder extends Vue {

	rating: number = 3

	pagination: any = {
		sortBy: 'date',
		descending: true,
		page: 1,
		rowsPerPage: 10
	}

	//This columns will be shown in the table
	columns: Array<any> = [
		{
			name: 'date',
			field: 'date', //field name on database
			required: true,
			label: 'Order Date', //Column name
			align: 'left',
			format: (v: any) => {
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
			name: 'transactionID',
			field: 'transactionID',
			required: true,
			label: 'Order ID',
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
			format: (v: any) => v ? "Yes" : "No",
			sortable: true
		},
	]

	rows: IOrders[] = []

	//this method will be executed when this page opens
	created() {
		this.loadTable()
		this.$root.$on('loadOrderTable', () => {
			this.loadTable()
		})
	}

	//this method is for fetching data from database based on userID
	loadTable() {
		let customer = this.$store.getters.currentUser.userID
		this.$db.collection(Collections.Orders).find({
			customer: {
				$eq: customer
			},
		}).then(rows => {
			this.rows = rows
		})
	}

	submitRating(id: string) {
		Loading.show()
		this.$db.collection(Collections.Orders).findOneAndUpdate({_id: id}, {
			$set: {rating: this.rating}
		}).then(() => {
			this.$q.notify({
				message: 'Rated Successful',
				type: 'positive'
			})
			this.loadTable()
		}).finally(() => {
			Loading.hide()
		})
	}

	submitReceived(id: string) {
		Loading.show()
		this.$db.collection(Collections.Orders).findOneAndUpdate({_id: id}, {
			$set: {isReceived: true}
		}).then(() => {
			this.$q.notify({
				message: 'Received Successful',
				type: 'positive'
			})
			this.loadTable()
		}).finally(() => {
			Loading.hide()
		})
	}
}
</script>

<style scoped>

</style>
