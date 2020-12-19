<template>
	<q-page padding>
		<q-row class="justify-center">
			<q-col class="col-md-8">
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
									<q-input v-model="item.quantity" type="number" readonly borderless style="min-width: 120px">
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
								<q-td class="text-right text-bold" colspan="2">{{ $store.getters.cartItems.map((i) => Number(i.price)).reduce((a, b) => a + b, 0).toFixed(2) }} ৳
								</q-td>
							</q-tr>
							</tfoot>
						</q-markup-table>
					</q-col>
				</q-row>
				<q-row class="text-center q-mt-lg">
					<q-col>
						<q-btn label="Clear Cart" icon="delete" color="negative" @click="confirmClearCart" :disable="!$store.getters.cartItems.length"/>
					</q-col>
					<q-col>
						<q-btn label="Proceed to pay" color="positive" @click="proceedToPay"/>
					</q-col>
				</q-row>
			</q-col>
		</q-row>
	</q-page>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class Checkout extends Vue {


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

	}

}
</script>

<style scoped>

</style>
