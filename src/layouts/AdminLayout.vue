<template>
	<q-layout view="hHh LpR fFf">
		<q-header elevated class="bg-positive">
			<q-toolbar>
				<q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" v-if="$realm.currentUser"/>
				<q-toolbar-title>
					<q-icon name="shopping_cart"/>
					eCommerce admin
				</q-toolbar-title>
				<q-btn text-color="black" label="Sign Out" @click="logout" color="white" no-caps v-if="$realm.currentUser"/>
			</q-toolbar>
		</q-header>
		<q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated v-if="$realm.currentUser">
			<q-scroll-area class="fit">
				<q-list>
					<q-item :to="{name: 'adminHome'}" exact>
						<q-item-section avatar>
							<q-icon name="home"/>
						</q-item-section>
						<q-item-section>
							<q-item-label>
								Dashboard
							</q-item-label>
						</q-item-section>
					</q-item>
					<q-expansion-item label="Products Categories" icon="category">
						<q-list>
							<q-item @click="$root.$emit('showAddCategory')" clickable>
								<q-item-section avatar>
									<q-icon name="library_add"/>
								</q-item-section>
								<q-item-section>
									<q-item-label>
										Add Category
									</q-item-label>
								</q-item-section>
							</q-item>
							<q-item :to="{name: 'productsCategories'}" exact>
								<q-item-section avatar>
									<q-icon name="format_list_bulleted"/>
								</q-item-section>
								<q-item-section>
									<q-item-label>
										View Categories
									</q-item-label>
								</q-item-section>
							</q-item>
						</q-list>
					</q-expansion-item>
					<q-expansion-item label="Reports" icon="folder_open">
						<q-list>
							<q-item @click="$root.$emit('showReports')" clickable>
								<q-item-section avatar>
									<q-icon name="monetization_on"/>
								</q-item-section>
								<q-item-section>
									<q-item-label>
										Sales
									</q-item-label>
								</q-item-section>
							</q-item>
							<q-item :to="{name: 'productsCategories'}" exact>
								<q-item-section avatar>
									<q-icon name="format_list_bulleted"/>
								</q-item-section>
								<q-item-section>
									<q-item-label>
										Products
									</q-item-label>
								</q-item-section>
							</q-item>
							<q-item :to="{name: 'productsCategories'}" exact>
								<q-item-section avatar>
									<q-icon name="account_circle"/>
								</q-item-section>
								<q-item-section>
									<q-item-label>
										Customers
									</q-item-label>
								</q-item-section>
							</q-item>
						</q-list>
					</q-expansion-item>
					<q-item @click="$root.$emit('showAddProducts')" clickable>
						<q-item-section avatar>
							<q-icon name="library_add"/>
						</q-item-section>
						<q-item-section>
							<q-item-label>
								Add Product
							</q-item-label>
						</q-item-section>
					</q-item>
					<q-item :to="{name: 'products'}" exact>
						<q-item-section avatar>
							<q-icon name="format_list_bulleted"/>
						</q-item-section>
						<q-item-section>
							<q-item-label>
								Products List
							</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</q-scroll-area>
		</q-drawer>
		<q-page-container>
			<router-view exact/>
		</q-page-container>
		<!--call popups-->
		<add-category/>
		<add-products/>
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
export default class MainLayout extends Vue {

	leftDrawerOpen = true;
	text: string = ''

	logout() {
		Loading.show()
		//@ts-ignore
		this.$realm.currentUser.logOut().then(() => {
			this.$router.push({name: 'adminLogIn'})
		}).finally(()=> {
			Loading.hide()
		})
	}
}

</script>
