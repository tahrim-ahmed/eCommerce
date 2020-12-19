<template>
	<div class="q-pa-md q-gutter-sm">
		<q-breadcrumbs>
			<q-breadcrumbs-el label="Home" icon="home"/>
		</q-breadcrumbs>
	</div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Loading} from "quasar";

@Component
export default class Dashboard extends Vue {
	created() {
		Loading.show()
		Loading.hide()
	}
}
</script>

<style lang=scss>
</style>
