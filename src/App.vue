<template>
  <v-app>
    <v-app-bar color="#6A76AB" dark height="150" class="header">
      <v-app-bar-title class="title">Тестовое задание</v-app-bar-title>
    </v-app-bar>
    <div class="main-container">
      <filter-block class="filter" @change="setFilterParams" />
      <div>
        <sort-block @change="setSortOrder" class="sorter"></sort-block>
        <router-view :filter-params="filterParams" :sort-order="sortOrder" />
      </div>
    </div>
  </v-app>
</template>
<script lang="ts">
import { CARDS_STORE_NAME } from '@/config';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { FilterParams } from './store/modules/cards/interfaces';

const cardsStore = namespace(CARDS_STORE_NAME);

@Component({
  components: {
    FilterBlock: () => import('@/components/FilterBlock.vue'),
    SortBlock: () => import('@/components/SortBlock.vue'),
  },
})
export default class App extends Vue {
  @cardsStore.Action('fetchAllCards') private fetchAllCards!: () => boolean;

  @cardsStore.Action('deleteCard') private deleteCard!: (id: string) => boolean;

  private filterParams: FilterParams[] = [];

  private sortOrder = '';

  private setFilterParams(value: FilterParams[]) {
    this.filterParams = value;
  }

  private setSortOrder(value: string) {
    this.sortOrder = value;
  }

  beforeMount(): void {
    this.fetchAllCards();
  }
}
</script>

<style lang="scss">
html,
body {
  background: #fafafa;
  height: 100%;
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  outline: 0;
}

.main {
  font-family: Roboto, sans-serif;
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 300px auto;
}
.header {
  max-height: 200px;
}
.title {
  font-family: Roboto, sans-serif;
  font-size: 48px;
  font-weight: 400;
  padding-left: 40px;
}
.main-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  .filter {
    margin: 40px;
  }
  .sorter {
    margin: 40px;
  }
}
.router-btn {
  right: 40px;
  bottom: 40px;
}
</style>
