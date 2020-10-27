<template>
	<q-dialog v-model="show" persistent>
		<q-card style="width:500px">
			<q-form ref="category" greedy @submit.prevent="save">
				<q-card-section>
					Add Category
				</q-card-section>
				<q-card-section>
					<q-row>
						<q-col class="col-12">
							<q-input v-model="category.name" label="Category Name" :rules="[$common.rules.required]"/>
						</q-col>
					</q-row>
				</q-card-section>
				<q-card-actions>
					<q-btn label="Save" no-caps color="primary" type="submit"/>
					<q-btn label="Close" no-caps v-close-popup/>
				</q-card-actions>
			</q-form>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {ICategory} from "src/interfaces/ICategory";
import {Loading, QForm} from "quasar";
import {Collections} from "src/interfaces/util";

@Component
export default class AddCategory extends Vue {
	show: boolean = false
	category: ICategory = {
		name: '',
	}

	created() {
		this.$root.$on('showAddCategory', () => {
			this.show = true
		})
	}

	save() {
		Loading.show()
		this.$db.collection(Collections.productCategories).insertOne(this.category).then(value => {
			this.show = false
			this.$q.notify({
				message: 'Product Category add success!',
				type: 'positive'
			})
			this.$root.$emit('loadProductCategories')
		}).finally(() => {
			Loading.hide()
		})
	}

	//@ts-ignore
	$refs: {
		category: QForm
	}
}
</script>

<style lang=scss>
</style>
