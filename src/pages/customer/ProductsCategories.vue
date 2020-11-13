<template>
	<q-page>
		<q-table title="Product Categories" :data="rows" :columns="columns" row-key="_id.$oid" color="amber" :filter="filter">
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
import {Component, Vue} from 'vue-property-decorator';
import {Collections} from "src/interfaces/util";
import {Loading} from "quasar";
import EditCategory from "components/admin/EditCategory.vue";
import Qcol from "components/qcol.vue";

@Component({
	components: {Qcol, EditCategory}
})
export default class ProductsCategories extends Vue {
	filter: string = '';
	columns: Array<any> = [
		{
			name: 'name',
			field: 'name',
			required: true,
			label: 'Name',
			align: 'left',
			format: (v: any) => v,
			sortable: true
		},
		{
			name: 'action',
			field: '_id',
			required: true,
			label: 'Action',
			align: 'left',
			sortable: true
		}
	]
	rows: any[] = []

	mounted() {
		this.loadTable()
	}

	created() {
		this.$root.$on('loadProductCategories', () => {
			this.loadTable()
		})
	}

	loadTable() {
		Loading.show()
		this.$db.collection(Collections.productCategories).find().then(rows => {
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

	editCategory(_id: string) {

	}
}
</script>

<style lang=scss>
</style>
