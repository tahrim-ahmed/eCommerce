<template>
<div class="row">
	<slot />
</div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class qrow extends Vue {

}
</script>

<style lang=scss>
</style>
