<template>
	<q-layout view="hHh LpR fFf">
		<q-header elevated>
			<q-toolbar class="row">
				<q-space/>
				<q-col class="col-auto">
					<router-link :to="{name: 'home'}">
						<q-toolbar-title>
							<q-icon name="shopping_cart"/>
							eCommerce
						</q-toolbar-title>
					</router-link>
				</q-col>
				<q-col class="col-grow col-md-7 q-pl-md">
					<q-input input-class="text-white" square v-model="text" color="white" placeholder="Search Products"
					         dense>
						<template v-slot:append>
							<q-icon name="search"/>
						</template>
					</q-input>
				</q-col>
				<q-space/>
				<q-space/>
				<q-space/>
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
													{{$store.getters.cartItems.map((i)=>Number(i.price)).reduce((a, b)=>a+b,0)}} BDT
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
					<q-col class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue" @mouseover="menu_elc=true">
						Electronics
						<q-menu
							fit
							@mouseleave="menu_elc=false"
							v-model="menu_elc"
							transition-show="flip-right"
							transition-hide="flip-left"
						>
							<q-list dense class="text-grey-9 text-caption">
								<q-item @click="" clickable>
									<q-item-section>Cameras</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Computer & Mobile Accessories</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Desktops</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Gaming Consoles</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Laptops</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Mobiles</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Printers</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Speakers & Sound Systems</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Tablets</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>TV</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Wearables</q-item-section>
								</q-item>
							</q-list>
						</q-menu>
						<q-icon size="sm" class="q-ml-xs text-grey-5" name="keyboard_arrow_down"></q-icon>
					</q-col>
					<q-col class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue" @mouseover="menu_mens=true">
						Men's Fashion
						<q-menu
							fit
							@mouseleave="menu_mens=false"
							v-model="menu_mens"
							transition-show="flip-right"
							transition-hide="flip-left"
						>
							<q-list dense class="text-grey-9 text-caption">
								<q-item @click="" clickable>
									<q-item-section>Hoodies & Sweaters</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Jeans</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Men's Accessories</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Men's Bags</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Men's Jackets & Coats</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Men's Pants</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Men's Shoes</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Panjabi & Fatua</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Polo Shirts</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Shirts</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Suits</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>T-Shirts</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Underwear</q-item-section>
								</q-item>
							</q-list>
						</q-menu>
						<q-icon size="sm" class="q-ml-xs text-grey-5" name="keyboard_arrow_down"></q-icon>
					</q-col>
					<q-col class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue" @mouseover="menu_womens=true">
						Women's Fashion
						<q-menu
							fit
							@mouseleave="menu_womens=false"
							v-model="menu_womens"
							transition-show="flip-right"
							transition-hide="flip-left"
						>
							<q-list dense class="text-grey-9 text-caption">
								<q-item @click="" clickable>
									<q-item-section>Kurtis</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Lingerie, Sleep & Lounge</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Saree</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Shalwar Kameez</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Shorts</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Skirts</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Sweaters</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Traditional</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Tops</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Women's Accessories</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Women's Jackets & Coats</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Women's Pants</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Women's Shoes</q-item-section>
								</q-item>
							</q-list>
						</q-menu>
						<q-icon size="sm" class="q-ml-xs text-grey-5" name="keyboard_arrow_down"></q-icon>
					</q-col>
					<q-col class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue" @mouseover="menu_sports=true">
						Sports & Outdoors
						<q-menu
							fit
							@mouseleave="menu_sports=false"
							v-model="menu_sports"
							transition-show="flip-right"
							transition-hide="flip-left"
						>
							<q-list dense class="text-grey-9 text-caption">
								<q-item @click="" clickable>
									<q-item-section>Boxing, Martial Arts & MMA</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Camping & Hiking</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Cycling</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Dumbbells</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Exercise & Fitness</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Fitness Accessories</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Outdoor Recreation</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Racket Sports</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Shoes & Clothing</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Team Sports</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Treadmills</q-item-section>
								</q-item>
							</q-list>
						</q-menu>
						<q-icon size="sm" class="q-ml-xs text-grey-5" name="keyboard_arrow_down"></q-icon>
					</q-col>
					<q-col class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue" @mouseover="menu_appliances=true">
						Home Appliances
						<q-menu
							fit
							@mouseleave="menu_appliances=false"
							v-model="menu_appliances"
							transition-show="flip-right"
							transition-hide="flip-left"
						>
							<q-list dense class="text-grey-9 text-caption">
								<q-item @click="" clickable>
									<q-item-section>Cooling & Heating</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Irons & Garments Steamers</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Large Appliances</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Small Kitchen Appliances</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Vacuums & Floor Care</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Water Purifiers & Filters</q-item-section>
								</q-item>
							</q-list>
						</q-menu>
						<q-icon size="sm" class="q-ml-xs text-grey-5" name="keyboard_arrow_down"></q-icon>
					</q-col>
					<q-col class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue" @mouseover="menu_beauty=true">
						Health & Beauty
						<q-menu
							fit
							@mouseleave="menu_beauty=false"
							v-model="menu_beauty"
							transition-show="flip-right"
							transition-hide="flip-left"
						>
							<q-list dense class="text-grey-9 text-caption">
								<q-item @click="" clickable>
									<q-item-section>Bath & Body</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Beauty Tools</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Food Supplements</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Fragrances</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Hair Care</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Makeup</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Medical Supplies</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Men's Care</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Personal Care</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Skin Care</q-item-section>
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


import {Vue, Component} from 'vue-property-decorator';
import {Loading} from "quasar";
import {IProduct} from "src/interfaces/IProduct";
import Qcol from "components/qcol.vue";

@Component({
	components: {Qcol}
})

export default class MainLayout extends Vue {
	menu_elc = false;
	menu_mens = false;
	menu_womens = false;
	menu_sports = false;
	menu_appliances = false;
	menu_beauty = false;

	text: string = ''

	onItemClick() {

	}

	created() {
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
		console.log(this.$q.localStorage.getItem<Array<IProduct>>('cartItems'));
		Loading.show()
		this.$router.push({name: 'checkout'}).finally(() => {
			Loading.hide()
		})
	}

	orders(){
		Loading.show()
		this.$router.push({name: 'orders'}).finally(()=>{
			Loading.hide()
		})
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
}

</script>
