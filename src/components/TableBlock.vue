<template>
  <div class="grid-container">
    <v-data-table :headers="headers" :items="tableItems" class="elevation-2">
      <template #[`item.actions`]="{ item }">
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-btn class="mx-2 router-btn" fab dark color="teal" absolute @click="onClick">
      <v-icon dark> mdi-format-list-bulleted-square </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { CARDS_STORE_NAME } from '@/config';
import { Card, FilterParams } from '@/store/modules/cards/interfaces';
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const cardsStore = namespace(CARDS_STORE_NAME);

@Component({})
export default class TableView extends Vue {
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
    { text: 'Дата создания', value: 'formattedDate', sortable: false },
    { text: '', value: 'actions', sortable: false },
  ];

  private get tableItems(): Card[] {
    let result = [...this.cards];
    const field = 'number';
    if (this.filterParams.length) {
      // eslint-disable-next-line no-restricted-syntax
      for (const filter of this.filterParams) {
        // eslint-disable-next-line max-len
        result = result.filter((item) => (filter.value
          ? item[filter.field].toLowerCase().includes(filter.value.toLowerCase())
          : true));
      }
    }
    if (this.sortOrder === 'asc') {
      result = result.sort((a, b) => {
        if ((a[field] || '') > (b[field] || '')) {
          return 1;
        }
        if ((a[field] || '') < (b[field] || '')) {
          return -1;
        }
        return 0;
      });
    } else if (this.sortOrder === 'desc') {
      result = result.sort((a, b) => {
        if ((a[field] || '') > (b[field] || '')) {
          return -1;
        }
        if ((a[field] || '') < (b[field] || '')) {
          return 1;
        }
        return 0;
      });
    }
    return result;
  }

  private deleteItem(item: Card) {
    return this.deleteCard(item.id);
  }

  private onClick() {
    this.$router.push('/cards');
  }
}
</script>
<style lang="scss" scoped></style>
