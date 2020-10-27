<template>
	<q-dialog v-model="show" persistent>
		<q-card style="width: 500px">
			<q-form ref="category" greedy @submit.prevent="edit">
				<q-card-section>
					Edit Category
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
import {Collections} from "src/interfaces/util";
import {Loading} from "quasar";

@Component
export default class EditCategory extends Vue {
	show: boolean = false
	category: ICategory = {
		name: '',
	}

	created() {
		this.$root.$on('showEditCategory', (_id: any) => {
			Loading.show()
			this.$db.collection(Collections.productCategories).findOne({
				_id
			}).then(value => {
				this.category= value
			}).finally(()=>{
				Loading.hide()
				this.show = true
			})
		})
	}

	edit(){
		Loading.show()
		this.$db.collection(Collections.productCategories).updateOne({
			_id: this.category._id
		}, this.category).then(value => {
			this.show = false
			this.$q.notify({
				message: 'Update Success',
				type: 'positive'
			})
			this.$root.$emit('loadProductCategories')
		}).finally(()=>{
			Loading.hide()
		})
	}
}
</script>

<style lang=scss>
</style>
