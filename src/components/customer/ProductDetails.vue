<template>
	<q-dialog v-model="show">
		<q-card>
			<q-card-section>
				<q-img :src="item.image" height="200px" contain/>
			</q-card-section>
			<q-card-section><h2>{{item.name}}</h2></q-card-section>
			<q-card-section><h3>Price: {{item.price}}</h3></q-card-section>
			<q-card-section><h4>Available Quantity: {{item.quantity}}</h4></q-card-section>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Collections} from "src/interfaces/util";
import {IProduct} from "src/interfaces/IProduct";
import {Loading} from "quasar";

@Component
export default class ProductDetails extends Vue {
	show: boolean = false
	item: IProduct = {
		image: '',
		category: '',
		price: null,
		quantity: null,
		name: ''
	}

	created() {
		this.$root.$on('showProductDetails', (_id: any) => {
			this.show = true
			this.$db.collection(Collections.product).findOne({
				_id
			}).then(value => {
				this.item = value
				if (this.item.image) {
					this.$storage.child(this.item.image).getDownloadURL().then(v => {
						this.item.image = v
					})
				} else {
					this.item.image = '/images/cart.png'
				}
			}).finally(() => {
				Loading.hide()
			})

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

<style scoped>

</style>
