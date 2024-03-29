<template>
	<q-page>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" icon="home"/>
				<q-breadcrumbs-el label="Customer" icon="group"/>
			</q-breadcrumbs>
		</div>
		<q-table title="Customer List" :data="rows" :columns="columns" row-key="_id.$oid" color="amber"
		         :filter="filter" :pagination.sync="pagination" binary-state-sort wrap-cells card-class="full-width">
			<template v-slot:no-data="{ icon, message, filter }">
				<div class="full-width row flex-center text-accent q-gutter-sm text-h4 q-my-xl q-py-xl">
					<q-icon color="warning" :name="filter ? 'warning' : icon" size="2em"/>
					<span>No data to show!</span>
				</div>
			</template>
			<template v-slot:top-right>
				<q-input dense debounce="300" v-model="filter" placeholder="Search">
					<template v-slot:append>
						<q-icon name="search"/>
					</template>
				</q-input>
			</template>
			<template v-slot:body-cell-action="props">
				<q-td :props="props">
					<q-separator/>
					<q-btn icon="delete">
						<q-popup-proxy persistent>
							<q-card>
								<q-card-section class="q-pb-none">
									<q-banner dense>
										<template v-slot:avatar>
											<q-icon name="warning" color="red"/>
										</template>
										You are about to delete this data!
									</q-banner>
								</q-card-section>

								<q-card-actions align="right" class="q-pt-none">
									<q-btn label="Confirm" no-caps v-close-popup @click="deleteCategory(props.row._id)" color="red"/>
									<q-btn label="No" no-caps v-close-popup/>
								</q-card-actions>
							</q-card>
						</q-popup-proxy>
					</q-btn>
				</q-td>
			</template>
		</q-table>
	</q-page>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {Collections} from "src/interfaces/util";
import {Loading} from "quasar";
import Qcol from "components/qcol.vue";

@Component({
	components: {Qcol}
})
export default class Customer extends Vue {
	filter: string = '';
	pagination: any = {
		sortBy: 'name',
		descending: false,
		page: 1,
		rowsPerPage: 10
	}

	columns: Array<any> = []
	rows: any[] = []

	@Watch('$route', {immediate: true})
	onRouteEnter() {
		this.columns = [
			{
				name: 'name',
				field: 'userID',
				required: true,
				label: 'Name',
				align: 'left',
				format: (v: any) => v,
				sortable: true
			},
			{
				name: 'action',
				field: '_id',
				label: 'Action',
				align: 'left'
			}
		]
		this.loadTable()
	}

	created() {
		this.$root.$on('loadProductCategories', () => {
			this.loadTable()
		})
	}

	loadTable() {
		Loading.show()
		this.$db.collection(Collections.USERS).find().then(rows => {
			this.rows = rows
		}).finally(() => {
			Loading.hide()
		})
	}

	deleteCategory(_id: string) {
		Loading.show()
		this.$db.collection(Collections.USERS).deleteOne({
			_id
		}).then(() => {
			this.$q.notify({
				message: 'Deleted Successfully!',
				type: 'positive'
			})
		}).finally(() => {
			Loading.hide()
			this.loadTable()
		})
	}
}
</script>

<style lang=scss>
</style>
