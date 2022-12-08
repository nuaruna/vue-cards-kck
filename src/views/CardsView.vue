<template><cards-block :filterParams="filterParams" :sortOrder="sortOrder" /></template>

<script lang="ts">
import { FilterParams } from '@/store/modules/cards/interfaces';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: { CardsBlock: () => import('@/components/CardsBlock.vue') } })
export default class CardsView extends Vue {
  @Prop({ required: true }) private filterParams!: FilterParams[];

  @Prop({ required: true }) private sortOrder!: string;
}
</script>
