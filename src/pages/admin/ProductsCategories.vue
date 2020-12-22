<template>
	<q-page>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" icon="home"/>
				<q-breadcrumbs-el label="Categories" icon="category"/>
			</q-breadcrumbs>
		</div>
		<q-table title="Product Categories" :data="rows" :columns="columns" row-key="_id.$oid" color="amber"
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
					<q-btn icon="edit" @click="$root.$emit('showEditCategory', props.row._id)"/>
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
		<edit-category/>
	</q-page>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {Collections} from "src/interfaces/util";
import {Loading} from "quasar";
import EditCategory from "components/admin/EditCategory.vue";
import Qcol from "components/qcol.vue";

@Component({
	components: {Qcol, EditCategory}
})
export default class ProductsCategories extends Vue {
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
				name: 'parent',
				field: 'category',
				required: true,
				label: 'Parent Category',
				align: 'left',
				format: (v: any) => v.length ? v[0].name : '',
				sortable: true
			}, {
				name: 'name',
				field: 'name',
				required: true,
				label: 'Category Name',
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
		this.$db.collection(Collections.productCategories).aggregate([
			{
				$lookup: {
					from: Collections.productCategories,
					let: {id: '$parent'},
					pipeline: [
						{$match: {$expr: {$eq: ['$_id', '$$id']}}},
						{$project: {_id: 1, name: 1}}
					],
					as: 'category'
				}
			}
		]).then(rows => {
			this.rows = rows
		}).finally(() => {
			Loading.hide()
		})
	}

	deleteCategory(_id: string) {
		Loading.show()
		this.$db.collection(Collections.productCategories).deleteOne({
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
