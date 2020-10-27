<template>
<div class="col">
	<slot/>
</div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class qcol extends Vue {

}
</script>

<style lang=scss>
</style>
