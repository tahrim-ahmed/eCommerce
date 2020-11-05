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
					<q-btn label="Login" color="black" no-caps/>
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
									<q-item-section>Shirts</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>T-Shirts</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Sweaters</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Pants</q-item-section>
								</q-item>
							</q-list>
						</q-menu>
						<q-icon size="sm" class="q-ml-xs text-grey-5" name="keyboard_arrow_down"></q-icon>
					</q-col>
					<q-col class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue" @mouseover="menu_mens=true">
						Electronics
						<q-menu
							fit
							@mouseleave="menu_mens=false"
							v-model="menu_mens"
							transition-show="flip-right"
							transition-hide="flip-left"
						>
							<q-list dense class="text-grey-9 text-caption">
								<q-item @click="" clickable>
									<q-item-section>Shirts</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>T-Shirts</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Sweaters</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Pants</q-item-section>
								</q-item>
							</q-list>
						</q-menu>
						<q-icon size="sm" class="q-ml-xs text-grey-5" name="keyboard_arrow_down"></q-icon>
					</q-col>
					<q-col class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue" @mouseover="menu_womens=true">
						Electronics
						<q-menu
							fit
							@mouseleave="menu_womens=false"
							v-model="menu_womens"
							transition-show="flip-right"
							transition-hide="flip-left"
						>
							<q-list dense class="text-grey-9 text-caption">
								<q-item @click="" clickable>
									<q-item-section>Shirts</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>T-Shirts</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Sweaters</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Pants</q-item-section>
								</q-item>
							</q-list>
						</q-menu>
						<q-icon size="sm" class="q-ml-xs text-grey-5" name="keyboard_arrow_down"></q-icon>
					</q-col>
					<q-col class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue" @mouseover="menu_sports=true">
						Electronics
						<q-menu
							fit
							@mouseleave="menu_sports=false"
							v-model="menu_sports"
							transition-show="flip-right"
							transition-hide="flip-left"
						>
							<q-list dense class="text-grey-9 text-caption">
								<q-item @click="" clickable>
									<q-item-section>Shirts</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>T-Shirts</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Sweaters</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Pants</q-item-section>
								</q-item>
							</q-list>
						</q-menu>
						<q-icon size="sm" class="q-ml-xs text-grey-5" name="keyboard_arrow_down"></q-icon>
					</q-col>
					<q-col class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue" @mouseover="menu_appliances=true">
						Electronics
						<q-menu
							fit
							@mouseleave="menu_appliances=false"
							v-model="menu_appliances"
							transition-show="flip-right"
							transition-hide="flip-left"
						>
							<q-list dense class="text-grey-9 text-caption">
								<q-item @click="" clickable>
									<q-item-section>Shirts</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>T-Shirts</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Sweaters</q-item-section>
								</q-item>
								<q-item @click="" clickable>
									<q-item-section>Pants</q-item-section>
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

@Component

export default class MainLayout extends Vue {
	menu_elc = false;
	menu_mens = false;
	menu_womens = false;
	menu_sports = false;
	menu_appliances = false;

	text: string = ''
}

</script>
