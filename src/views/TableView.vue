<template><table-block :filterParams="filterParams" :sortOrder="sortOrder" /></template>

<script lang="ts">
import { FilterParams } from '@/store/modules/cards/interfaces';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: { TableBlock: () => import('@/components/TableBlock.vue') } })
export default class TableView extends Vue {
  @Prop({ required: true }) private filterParams!: FilterParams[];

  @Prop({ required: true }) private sortOrder!: string;
}
</script>
