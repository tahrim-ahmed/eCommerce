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
	leftDrawerOpen = false;

	text: string = ''
}

</script>
