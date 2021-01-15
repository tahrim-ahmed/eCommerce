<template>
	<q-dialog v-model="show" persistent>
		<q-card v-if="order">
			<q-card-section class="row">
				<p class="col text-h5">
					Mark as Received?
				</p>
				<q-col class="col-auto">

				</q-col>
			</q-card-section>
			<q-card-section>
				Are you sure?
			</q-card-section>
			<q-card-actions>
				<q-btn label="Yes" color="positive" @click="markReceived" v-close-popup/>
				<q-btn label="No" v-close-popup/>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {IOrders} from "src/interfaces/IOrders";
import {Collections} from "src/interfaces/util";

@Component
export default class Rating extends Vue {
	show: boolean = false
	order: IOrders = null

	created() {
		this.$root.$on('rating', (order: IOrders) => {
			this.order = order
			this.show = true
		})
	}

	markReceived(){
		this.$db.collection(Collections.Orders).findOneAndUpdate({_id: this.order._id}, {$set: {isDelivered: true}
		}).then(()=>{
			this.$q.notify({
				message: 'Received Successful',
				type: 'positive'
			})
			this.$root.$emit('loadOrderTable')
		})
	}
}
</script>

<style scoped>

</style>
