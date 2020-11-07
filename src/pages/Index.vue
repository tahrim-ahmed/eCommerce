<template>
	<q-page padding>
		<q-row v-if="rows.length">
			<q-col class="col-sm-3 col-12 q-px-md" v-for="row of rows" :key="row._id.$oid">
				<q-card class="my-card full-height">
					<q-img :src="row.image" height="200px" contain/>
					<q-separator/>
					<q-card-section>
						<div class="text-h6" style="color: darkblue">{{ row.name }}</div>
						<div class="text-subtitle2">{{ row.category.name }}</div>
					</q-card-section>
				</q-card>
			</q-col>
		</q-row>
	</q-page>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Loading} from "quasar";
import {Collections} from "src/interfaces/util";
import {IProduct} from "src/interfaces/IProduct";

@Component
export default class PageIndex extends Vue {

	rows: any[] = []

	mounted() {
		this.loadTable()
	}

	created() {
		this.$root.$on('productsAdded', () => {
			this.loadTable()
		})
	}

	loadTable() {
		Loading.show()
		this.$db.collection(Collections.products).aggregate([{
			$project: {
				name: 1,
				category: 1,
				quantity: 1,
				image: 1
			},
		}, {
			$lookup: {
				from: Collections.productCategories,
				let: {id: '$category'},
				pipeline: [
					{$match: {$expr: {$eq: ['$_id', '$$id']}}},
					{$project: {_id: 1, name: 1}}
				],
				as: 'category'
			}
		},
			{
				$project: {
					name: 1,
					image: 1,
					category: {
						$arrayElemAt: ['$category', 0]
					},
					quantity: 1
				}
			}]).then(async rows => {
			this.rows = rows
			this.rows.forEach((m: IProduct) => {
				if (m.image) {
					this.$storage.child(m.image).getDownloadURL().then(v => {
						m.image = v
					})
				} else {
					m.image = '/images/cart.png'
				}
			})
		}).finally(() => {
			Loading.hide()
		})
	}

	getImage(row: IProduct) {
		console.log(row)
		if (row.image) {
			return this.$storage.child(row.image).getDownloadURL().then(value => value)
		}
	}
}
</script>
