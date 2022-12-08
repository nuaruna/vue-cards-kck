<template>
  <v-card elevation="2">
    <v-container>
      <v-row class="form-item">
        <v-col
          ><v-select
            label="Сортировка по номеру заказа"
            :value="sortOrder"
            @change="onSortOrderChange"
            :items="selectItems"
          />
        </v-col> </v-row
    ></v-container>
  </v-card>
</template>

<script lang="ts">
import {
  Component, Vue, Emit,
} from 'vue-property-decorator';

@Component({})
export default class SortBlock extends Vue {
  private sortOrder = '';

  private selectItems = [
    {
      text: 'По возрастанию',
      value: 'asc',
    },
    {
      text: 'По убыванию',
      value: 'desc',
    },
  ];

  private onSortOrderChange(value: string) {
    this.sortOrder = value;
    this.emitSortOrderChange(value);
  }

  @Emit('change')
  // eslint-disable-next-line class-methods-use-this
  private emitSortOrderChange(value: string) {
    return value;
  }
}
</script>
<style lang="scss" scoped></style>
