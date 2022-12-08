<template>
  <div>
    <div class="cards-block">
      <div v-for="item of cardItems" :key="item.id" class="cards-block__card">
        <card :card="item" @delete="onDelete"></card>
      </div>
    </div>
    <v-btn
      class="mx-2 router-btn"
      fab
      dark
      color="teal"
      absolute
      @click="onClick"
    >
      <v-icon dark> mdi-format-align-justify </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { CARDS_STORE_NAME } from '@/config';
import { Card, FilterParams } from '@/store/modules/cards/interfaces';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const cardsStore = namespace(CARDS_STORE_NAME);

@Component({ components: { Card: () => import('@/components/Card.vue') } })
export default class CardsBlock extends Vue {
  @cardsStore.State('cards') private cards!: Card[];

  @cardsStore.Action('deleteCard') private deleteCard!: (id: string) => true;

  @Prop({ required: true }) private filterParams!: FilterParams[];

  @Prop({ required: true }) private sortOrder!: string;

  private readonly headers = [
    {
      text: 'ID',
      value: 'id',
      sortable: false,
    },
    { text: 'Номер накладной', value: 'number', sortable: false },
    { text: 'Тип заказа', value: 'formattedType', sortable: false },
    { text: 'Дата создания', value: 'creationDate', sortable: false },
  ];

  private get cardItems(): Card[] {
    let result = [...this.cards];
    if (this.filterParams.length) {
      // eslint-disable-next-line no-restricted-syntax
      for (const filter of this.filterParams) {
        // eslint-disable-next-line max-len
        result = result.filter((item) => item[filter.field].toLowerCase().includes(filter.value.toLowerCase()));
      }
    }
    if (this.sortOrder) {
      result = result.sort((a, b) => {
        if ((a[this.sortOrder] || '') > (b[this.sortOrder] || '')) {
          return -1;
        }
        if ((a[this.sortOrder] || '') < (b[this.sortOrder] || '')) {
          return 1;
        }
        return 0;
      });
    }
    result = result.map((item) => ({
      ...item,
      formattedType: this.getFormattedType(item.type),
    }));
    return result;
  }

  // eslint-disable-next-line class-methods-use-this
  private getFormattedType(type: string): string {
    switch (type) {
      case 'Pickup':
        return 'Самовывоз';
      case 'Pick-point':
        return 'Доставка в пункт выдачи';
      case 'Delivery':
        return 'Курьерская доставка';
      default:
        return '';
    }
  }

  private onDelete(id: string) {
    this.deleteCard(id);
  }

  private onClick() {
    this.$router.push('/');
  }
}
</script>
<style lang="scss" scoped>
.cards-block {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  &__card {
    height: 200px;
    widows: 200px;
    margin: 40px;
  }
}
</style>
