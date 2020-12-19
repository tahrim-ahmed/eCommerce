<template>
	<q-dialog v-model="show" persistent>
		<q-card style="width: 500px">
			<q-form ref="category" greedy @submit.prevent="edit">
				<q-card-section>
					Edit Product
				</q-card-section>
				<q-card-section>
					<q-row>
						<q-col class="col-12">
							<q-input v-model="product.name" label="Category Name" :rules="[$common.rules.required]"/>
						</q-col>
						<q-col class="col-12">
							<q-select label="Category" v-model="product.category" :options="optionsFilteredCategories"
							          map-options option-label="name" option-value="_id" emit-value use-input
							          input-debounce="500" @filter="filterFn" autofocus
							          :rules="[v=> !!v || 'Category Required!!']"/>
						</q-col>
						<q-col class="col-12">
							<q-input v-model.number="product.quantity" label="Quantity" type="number" :rules="[$common.rules.number]"/>
						</q-col>
						<q-col class="col-12">
							<q-input v-model.number="product.price" label="Price Per Unit" type="tel"
							         :rules="[$common.rules.number]">
								<template v-slot:after>
									BDT
								</template>
							</q-input>
						</q-col>
					</q-row>
				</q-card-section>
				<q-card-actions>
					<q-btn label="Save" no-caps color="primary" type="submit"/>
					<q-btn label="Close" no-caps v-close-popup/>
				</q-card-actions>
			</q-form>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Collections} from "src/interfaces/util";
import {Loading} from "quasar";
import {IProduct} from "src/interfaces/IProduct";

@Component
export default class EditProduct extends Vue {
	show: boolean = false
	product: IProduct = {
		name: '',
		category: null,
		image: null,
		price: null,
		quantity: null
	}
	oldImg: any = null
	optionsCategories: Array<any> = []
	optionsFilteredCategories: Array<any> = []

	created() {
		this.$root.$on('showEditProduct', (_id: any) => {
			Loading.show()
			this.$db.collection(Collections.product).findOne({
				_id
			}).then(value => {
				this.product = value
				this.$db.collection(Collections.productCategories).find().then(value => {
					this.optionsCategories = value
				})
			}).finally(() => {
				Loading.hide()
				this.show = true
			})
		})
	}

	filterFn(val: string, update: Function) {
		if (val === '') {
			update(() => {
				this.optionsFilteredCategories = this.optionsCategories
			})
		} else {
			update(() => {
				this.optionsFilteredCategories = this.optionsCategories.filter(f => (f.name.toLowerCase().indexOf(val.toLowerCase()) > -1))
			})
		}
	}

	edit() {
		Loading.show()
		this.$db.collection(Collections.product).updateOne({
			_id: this.product._id
		}, this.product).then(value => {
			this.show = false
			this.$q.notify({
				message: 'Update Success',
				type: 'positive'
			})
			this.$root.$emit('productsAdded')
		}).finally(() => {
			Loading.hide()
		})
	}
}
</script>

<style lang=scss>
</style>
