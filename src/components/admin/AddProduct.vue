<template>
	<q-dialog v-model="show" persistent>
		<q-card style="width:500px">
			<q-form ref="products" greedy @submit.prevent="save">
				<q-card-section v-if="!loading">
					Add Product
				</q-card-section>
				<q-card-section v-if="loading">
					<q-col class="col-12 text-center">
						<q-spinner-bars color="primary" size="200px"/>
					</q-col>
				</q-card-section>
				<q-card-section v-else>
					<q-row>
						<q-col>
							<q-input v-model="product.name" label="Product Name" :rules="[$common.rules.required]"/>
						</q-col>
					</q-row>
					<q-row>
						<q-col>
							<q-select label="Category" v-model="product.category" :options="optionsFilteredCategories"
									  map-options option-label="name" option-value="_id" emit-value use-input
									  input-debounce="500" @filter="filterFn"
									  :rules="[v=> !!v || 'Category Required!!']"/>
						</q-col>
					</q-row>
					<q-row>
						<q-col>
							<q-input v-model="product.quantity" label="Quantity" type="number"
									 :rules="[$common.rules.required]"/>
						</q-col>
					</q-row>
					<q-row>
						<q-col>
							<q-input v-model="product.price" label="Price Per Unit" type="number"
							         :rules="[$common.rules.required]">
								<template v-slot:after>
									BDT
								</template>
							</q-input>
						</q-col>
					</q-row>
					<q-row>
						<q-file v-model="image">
							<template v-slot:after>
								<q-avatar>
									<q-icon name="add_photo_alternate"/>
								</q-avatar>
							</template>
						</q-file>
					</q-row>
				</q-card-section>
				<q-card-actions v-if="!loading">
					<q-btn label="Save" no-caps color="primary" type="submit"/>
					<q-btn label="Close" no-caps @click="closeModal"/>
				</q-card-actions>
			</q-form>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Loading, QForm} from "quasar";
import {IProduct} from "src/interfaces/IProduct";
import {Collections} from "src/interfaces/util";
import * as BSON from 'bson'

@Component
export default class AddProducts extends Vue {
	show: boolean = false
	loading: boolean = true
	image: File = null
	product: IProduct = {
		name: '',
		category: null,
		price: null,
		quantity: '',
		image: ''
	}
	optionsCategories: Array<any> = []
	optionsFilteredCategories: Array<any> = []

	created() {

		this.$root.$on('showAddProducts', () => {
			this.product._id = new BSON.ObjectID()
			this.show = true
			this.$db.collection(Collections.productCategories).find().then(value => {
				this.optionsCategories = value
			}).finally(() => {
				this.loading = false
			})
		})
	}

	filterFn(val: string, update: Function) {
		if (val === '') {
			this.optionsFilteredCategories = []
		} else {
			update(() => {
				this.optionsFilteredCategories = this.optionsCategories.filter(f => (f.name.toLowerCase().indexOf(val.toLowerCase()) > -1))
			})
		}
	}

	save() {
		Loading.show({message: 'Adding Product'})
		let imagePath: any = null
		if (this.image) {
			imagePath = 'uploads/' + new BSON.ObjectId() + '.' + this.image.name.split('.').pop()
			this.product.image = imagePath
		}

		this.$db.collection(Collections.product).insertOne(this.product).then(value => {
			if (this.image) {
				this.$storage.child(imagePath).put(this.image, {
					customMetadata: {
						collection: Collections.product,
						id: this.product._id as string
					}
				})
			}
			this.$q.notify({
				message: 'Product add success!',
				type: 'positive'
			})
			this.$root.$emit('productsAdded')
		}).finally(() => {
			Loading.hide()
			this.closeModal()
		})

	}

	closeModal() {
		this.show = false
		this.loading = true
		this.product = {
			name: '',
			category: null,
			price: null,
			quantity: '',
			image: ''
		}
	}

	$refs: {
		products: QForm
	}
}
</script>

<style lang=scss>
</style>
