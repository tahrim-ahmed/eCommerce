<template>

</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Loading} from "quasar";

@Component
export default class Dashboard extends Vue {
	created() {
		console.log(this.$q)
	}
}
</script>

<style lang=scss>
</style>
