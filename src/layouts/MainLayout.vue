<template>
	<q-layout view="hHh LpR fFf">
		<q-header elevated>
			<q-toolbar class="row">
				<q-space/>
				<q-col class="col-8">
					<a class="col-md col-12" href="/">
						<q-img height="50px" position="0 0" contain src="images/eLogo.png"/>
					</a>
				</q-col>
				<q-col class="col-grow q-pl-md">
					<template>
						<div class="q-pa-md">
							<q-btn text-color="black" icon="shopping_cart" color="white" no-caps>
								<q-badge color="negative" floating v-if="$store.getters.cartItems.length">{{ $store.getters.cartItems.length }}</q-badge>
								<q-menu persistent>
									<q-item style="width: 500px">
										<q-item-section>
											<q-row>
												<q-col class="col-md-4 text-subtitle2">
													Item Name
												</q-col>
												<q-col class="col-md-3 text-subtitle2">
													Item Quantity
												</q-col>
												<q-col class="col-md-2 text-subtitle2">
													Unit Price
												</q-col>
												<q-col class="col-md-3 text-subtitle2">
													Total Price
												</q-col>
											</q-row>
										</q-item-section>
									</q-item>
									<q-separator/>
									<q-item v-for="item of $store.getters.cartItems " style="width: 500px" :key="Math.random()">
										<q-item-section>
											<q-row>
												<q-col class="col-md-4">
													{{ item.name }}
												</q-col>
												<q-col class="col-md-3">
													{{ item.quantity }}
												</q-col>
												<q-col class="col-md-2">
													{{ item.price }}
												</q-col>
												<q-col class="col-md-3">
													{{ item.price * item.quantity }} BDT
												</q-col>
											</q-row>
										</q-item-section>
									</q-item>
									<q-separator/>
									<q-item style="width: 500px">
										<q-item-section>
											<q-row>
												<q-col class="col-md-9">
													Total:
												</q-col>
												<q-col class="col-md-3">
													{{ getTotal($store.getters.cartItems) }} BDT
												</q-col>
											</q-row>
										</q-item-section>
									</q-item>

									<q-item>
										<q-item-section>
											<q-btn label="Check Out" no-caps v-close-popup color="primary" @click="initCheckout"/>
										</q-item-section>
										<q-item-section>
											<q-btn label="Close" no-caps v-close-popup/>
										</q-item-section>
									</q-item>
								</q-menu>
							</q-btn>
							<q-btn text-color="black" label="My Orders" @click="orders" color="white" no-caps v-if="$store.getters.isLoggedIn"/>
							<q-btn text-color="black" label="Sign Out" @click="logout" color="white" no-caps v-if="$store.getters.isLoggedIn"/>
							<q-btn color="white" text-color="black" label="Sign Up" no-caps v-if="!$store.getters.isLoggedIn" :to="{name:'signup'}"/>
							<q-btn color="white" text-color="black" label="Sign In" no-caps v-if="!$store.getters.isLoggedIn" :to="{name:'login'}"/>
						</div>
					</template>
				</q-col>
			</q-toolbar>
			<div class="bg-white text-grey-9 text-weight-bold shadow-transition" style="height: 35px">
				<q-row class="text-center items-center" style="padding-top: 7px">
					<q-col v-for="category of categories" :key="Math.random()" class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue"
					>
						{{ category.parent.name }}
						<q-menu
							fit
							transition-show="flip-right"
							transition-hide="flip-left"
						>
							<q-list dense class="text-grey-9 text-caption">
								<q-item :to="{name: 'category',params: { category: category.parent.name, subCategory: child.name}}" clickable v-for="child of
								category.childs"
										:key="Math.random()">
									<q-item-section>{{ child.name }}</q-item-section>
								</q-item>

							</q-list>
						</q-menu>
						<q-icon size="sm" class="q-ml-xs text-grey-5" name="keyboard_arrow_down"></q-icon>
					</q-col>

				</q-row>
			</div>
		</q-header>
		<q-page-container>
			<router-view/>
		</q-page-container>
	</q-layout>
</template>

<script lang="ts">


import {Component, Vue} from 'vue-property-decorator';
import {Loading} from "quasar";
import {IProduct} from "src/interfaces/IProduct";
import Qcol from "components/qcol.vue";
import {Collections, UserType} from "src/interfaces/util";

@Component({
	components: {Qcol}
})

export default class MainLayout extends Vue {

	text: string = ''

	categories: any[] = []

	onItemClick() {

	}

	created() {
		this.$db.collection(Collections.productCategories).find().then(categories => {
			categories.filter(category => !category.parent)
				.forEach(parent => {
					let childs = categories.filter(category => category.parent + '' == parent._id + '')
					this.categories.push({
						parent,
						childs
					})
				})
		})
		this.$root.$on('addToCart', (row: IProduct) => {
			let product: IProduct = JSON.parse(JSON.stringify(row))
			if (Number(row.quantity) > 0) {
				let cartItems = this.$q.localStorage.getItem<Array<IProduct>>('cartItems') || []
				let index = cartItems.findIndex((ci: IProduct) => product._id === ci._id)
				if (index < 0) {
					product.availableQuantity = row.quantity;
					product.quantity = 1;
					cartItems.push(product)
				} else {
					product = cartItems[index]
					if ((product.quantity + 1) <= row.quantity) {
						product.quantity += 1
						cartItems[index] = product
					} else {
						this.$q.notify({
							message: 'Out of stock Limit!',
							type: 'negative'
						})
					}
				}
				this.$store.commit('setItems', cartItems)
				this.$q.localStorage.set('cartItems', cartItems)
			} else {
				this.$q.notify({
					message: 'Out of stock Limit!',
					type: 'negative'
				})
			}
		})
	}

	initCheckout() {
		console.log(this.$store.getters.currentUser.userType , UserType.CUSTOMER);
		if (this.$store.getters.currentUser.userType== UserType.CUSTOMER) {
			Loading.show()
			this.$router.push({name: 'checkout'}).finally(() => {
				Loading.hide()
			})
		}
		else {
			this.$router.push({name: 'login'}).then(value => {
				this.$q.notify({
					message: 'Login Required!',
					type: 'negative'
				})
			})
		}
	}

	orders() {
		this.$router.push({name: 'myOrders'})
	}

	logout() {
		Loading.show()
		//@ts-ignore
		this.$realm.currentUser.logOut().then(() => {
			this.$store.commit("setCurrentUser", null)
			this.$store.commit("setIsLoggedIn", !this.$realm.currentUser.identities.map(value => value.providerType).includes("anon-user"))
			this.$router.push({name: 'home'})
		}).finally(() => {
			Loading.hide()
		})
	}

	getTotal(items:any[]){
		let total = 0;
		items.forEach(value => {
			total+= (value.price * value.quantity)
		})
		return total
	}
}

</script>
