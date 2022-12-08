import { Card, State } from './interfaces';
import * as types from './mutation-types';

export default {
  [types.SET_CARDS](state: State, values: Card[]) {
    state.cards = values;
  },
  [types.DELETE_CARD](state: State, id: string) {
    state.cards = state.cards.filter((item) => item.id !== id);
  },
};
