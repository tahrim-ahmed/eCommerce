<template>
	<q-layout view="hHh LpR fFf">
		<q-header elevated>
			<q-toolbar class="row">
				<q-space/>
				<q-col class="col-auto">
					<q-toolbar-title>
						<q-icon name="shopping_cart"/>
						eCommerce
					</q-toolbar-title>
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
							<q-btn-dropdown color="black" label="Log In" dropdown-icon="change_history">
								<q-list>
									<q-item :to="{name: 'login'}" clickable v-close-popup @click="onItemClick">
										<q-item-section>
											<q-item-label>Admin</q-item-label>
										</q-item-section>
									</q-item>

									<q-item clickable v-close-popup @click="onItemClick">
										<q-item-section>
											<q-item-label>Seller</q-item-label>
										</q-item-section>
									</q-item>

									<q-item :to="{name: 'login'}" clickable v-close-popup @click="onItemClick">
										<q-item-section>
											<q-item-label>Customer</q-item-label>
										</q-item-section>
									</q-item>
								</q-list>
							</q-btn-dropdown>
						</div>
					</template>
				</q-col>
			</q-toolbar>
			<div class="bg-white text-grey-9 text-weight-bold shadow-transition" style="height: 35px" v-if="$realm.currentUser">
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
import AddCategory from "components/admin/AddCategory.vue";
import {Loading} from "quasar";
import AddProducts from "components/admin/AddProduct.vue";

@Component({
	components: {AddProducts, AddCategory}
})
export default class CustomerLayout extends Vue {

	menu_elc = false;
	menu_mens = false;
	menu_womens = false;
	menu_sports = false;
	menu_appliances = false;
	menu_beauty = false;

	text: string = ''

	logout() {
		Loading.show()
		//@ts-ignore
		this.$realm.currentUser.logOut().then(() => {
			this.$router.push({name: 'login'})
		}).finally(()=> {
			Loading.hide()
		})
	}

	onItemClick(){

	}
}

</script>
