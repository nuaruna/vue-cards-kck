<template>
  <v-card elevation="2">
    <v-card-title>{{ card.id }}</v-card-title>
    <v-card-text>
      <div class="card-property">
        <span>Номер накладной: </span>
        <span>{{ card.number }}</span>
      </div>
      <div class="card-property">
        <span>Тип заказа: </span>
        <span>{{ card.formattedType }}</span>
      </div>
      <div class="card-property">
        <span>Дата создания: </span>
        <span>{{ card.formattedDate }}</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="teal accent-4" @click="onDelete">удалить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Card } from '@/store/modules/cards/interfaces';
import {
  Component, Vue, Prop, Emit, Ref, Watch,
} from 'vue-property-decorator';

@Component({})
export default class CardComponent extends Vue {
  @Prop({ required: true }) private card!: Card;

  @Emit('delete')
  private onDelete() {
    return this.card.id;
  }
}
</script>
<style lang="scss" scoped>
.card-property {
    display: flex;
    justify-content: space-between;
}
</style>
