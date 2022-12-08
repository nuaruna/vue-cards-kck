import Vue from 'vue';
import Vuex from 'vuex';

import { CARDS_STORE_NAME } from '@/config';
import Cards from './modules/cards';
import { RootState } from './modules/cards/interfaces';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    value: 'vuex works',
  } as RootState,
  modules: {
    [CARDS_STORE_NAME]: Cards,
  },
});
