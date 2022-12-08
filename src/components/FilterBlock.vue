<template>
  <v-card elevation="2">
    <v-container>
      <v-row class="form-item">
        <v-col>
          <v-text-field
            label="Номер накладной"
            :value="numberFilter"
            @change="onNumberFilterChange"
          />
        </v-col>
      </v-row>
      <v-row class="form-item">
        <v-col
          ><v-select
            label="Тип заказа накладной"
            :value="typeFilter"
            @change="onTypeFilterChange"
            :items="selectItems"
            clearable
          />
        </v-col> </v-row
    ></v-container>
  </v-card>
</template>

<script lang="ts">
import { FilterParams } from '@/store/modules/cards/interfaces';
import {
  Component, Vue, Prop, Emit, Ref, Watch,
} from 'vue-property-decorator';

@Component({})
export default class FilterBlock extends Vue {
  private numberFilter = '';

  private typeFilter = '';

  private selectItems = [
    {
      text: 'Самовывоз',
      value: 'Pickup',
    },
    {
      text: 'Курьерская доставка',
      value: 'Delivery',
    },
    {
      text: 'Доставка в пункт выдачи',
      value: 'Pick-point',
    },
  ];

  private onNumberFilterChange(value: string) {
    this.numberFilter = value;
    this.emitFilterChange([
      {
        field: 'number',
        value: this.numberFilter,
      },
      {
        field: 'type',
        value: this.typeFilter,
      },
    ]);
  }

  private onTypeFilterChange(value: string) {
    this.typeFilter = value;
    this.emitFilterChange([
      {
        field: 'number',
        value: this.numberFilter,
      },
      {
        field: 'type',
        value: this.typeFilter,
      },
    ]);
  }

  @Emit('change')
  // eslint-disable-next-line class-methods-use-this
  private emitFilterChange(value: FilterParams[]) {
    return value;
  }
}
</script>
<style lang="scss" scoped></style>
