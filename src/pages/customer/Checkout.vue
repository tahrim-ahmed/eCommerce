<template>
	<q-page padding>
		<q-row class="justify-center">
			<q-col class="col-md-8">
				<q-form greedy @submit.prevent="proceedToPay">
					<q-row>
						<q-col class="col-12">
							<q-markup-table>
								<thead>
								<q-tr>
									<q-th>
										Item Name
									</q-th>
									<q-th auto-width>
										Item Quantity
									</q-th>
									<q-th>
										Unit Price
									</q-th>
									<q-th>
										Total Price
									</q-th>
								</q-tr>
								</thead>
								<tbody>
								<q-tr v-for="(item,i) of $store.getters.cartItems" :key="item._id">
									<q-td>{{ i + 1 }}. {{ item.name }}</q-td>
									<q-td auto-width>
										<q-input v-model.number="item.quantity" type="number" readonly borderless style="min-width: 120px" :rules="[minOne]">
											<template v-slot:before>
												<q-btn color="negative" icon="remove" @click="$store.commit('decrementItemQuantity', item)" dense push/>
											</template>
											<template v-slot:after>
												<q-btn color="positive" icon="add" @click="$store.commit('incrementItemQuantity', item)" dense push/>
											</template>
										</q-input>
									</q-td>
									<q-td class="text-right">{{ Number(item.price).toFixed(2) }}</q-td>
									<q-td class="text-right text-bold">{{ Number(Number(item.price) * Number(item.quantity)).toFixed(2) }} ৳</q-td>
								</q-tr>
								</tbody>
								<tfoot>
								<q-tr>
									<q-td>
										Grand Total:
									</q-td>
									<q-td class="text-center text-bold">{{ $store.getters.cartItems.map((i) => Number(i.quantity)).reduce((a, b) => a + b, 0) }}</q-td>
									<q-td class="text-right text-bold" colspan="2">
										{{
											$store.getters.cartItems.map((i) => Number(i.price)).reduce((a, b) => a + b, 0) *
											$store.getters.cartItems.map((i) => Number(i.quantity)).reduce((a, b) => a + b, 0)
										}}
										৳
									</q-td>
								</q-tr>
								</tfoot>
							</q-markup-table>
						</q-col>
					</q-row>
					<q-row class="text-center q-mt-lg">
						<q-col v-if="!isProceed">
							<q-btn label="Clear Cart" icon="delete" color="negative" @click="confirmClearCart" :disable="!$store.getters.cartItems.length"/>
						</q-col>
						<q-col>
							<div id="paypal-button-container" v-if="isProceed"></div>
							<q-btn label="Proceed to pay" color="positive" type="submit" v-else/>

						</q-col>
					</q-row>
				</q-form>
			</q-col>
		</q-row>
	</q-page>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Loading} from "quasar";
import {Collections} from "src/interfaces/util";
import {IOrders} from "src/interfaces/IOrders";
import * as BSON from 'bson'

@Component
export default class Checkout extends Vue {

	isProceed: boolean = false

	minOne(v: Number) {
		return v > 0 ? true : 'Minimum 1'
	}

	created() {
	}

	confirmClearCart() {
		this.$q.dialog({
			message: 'Are you sure?',
			ok: {
				label: 'Yes',
				color: 'positive'
			},
			cancel: {
				label: 'No',
				color: 'negative'
			},
		}).onOk(() => {
			this.$store.commit('clearCart')
			this.$q.notify({
				message: 'Items cleared',
				type: 'positive'
			})
		})
	}

	proceedToPay() {
		this.isProceed = true
		var ck = this
		setTimeout(() => {
			let total = this.$store.getters.cartItems.map((i: any) => Number(i.price)).reduce((a: number, b: number) => a + b, 0) *
				this.$store.getters.cartItems.map((i: any) => Number(i.quantity)).reduce((a: number, b: number) => a + b, 0)
			//@ts-ignore
			window.paypal.Buttons({
				createOrder: function (data: any, actions: any) {

					return actions.order.create({
						purchase_units: [{
							amount: {
								value: total.toFixed(2)
							}
						}]
					});
				},
				onApprove: function (data: any, actions: any) {

					return actions.order.capture().then(function (details: any) {
						console.log(details);
						ck.saveOrder(details.id)

					});
				}
			}).render('#paypal-button-container');
		}, 100)
	}

	saveOrder(transactionID: string) {
		Loading.show()
		let order: IOrders = {
			customer: this.$store.getters.currentUser.userID,
			isDelivered: false,
			paymentStatus: true,
			price: this.$store.getters.cartItems.map((i: any) => Number(i.price)).reduce((a: number, b: number) => a + b, 0),
			products: this.$store.getters.cartItems,
			quantity: this.$store.getters.cartItems.map((i: any) => Number(i.quantity)).reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0),
			date: new Date(),
			transactionID
		}
		this.$db.collection(Collections.Orders).insertOne(order).then(value => {
			order.products.forEach(value1 => {
				this.$db.collection(Collections.product).findOneAndUpdate({_id: new BSON.ObjectID(value1._id)}, {
					$set: {
						quantity: value1.availableQuantity - value1.quantity
					}
				})
			})
		}).then(() => {
			this.$q.notify({
				message: 'Successfully Placed',
				type: 'positive'
			})
			this.$store.commit("clearCart")
		}).finally(() => {
			Loading.hide()
		})
	}

}
</script>

<style scoped>

</style>
