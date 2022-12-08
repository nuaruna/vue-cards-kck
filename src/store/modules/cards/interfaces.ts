import { ActionContext } from 'vuex';

export interface Card {
  [key: string]: string;
  id: string;
  number: string;
  type: string;
  creationDate: string;
  formattedType: string;
}

export interface State {
  cards: Card[];
}

export interface RootState {
  value: 'vuex works';
}

export interface FilterParams {
  field: string;
  value: string;
}

export type TActionContext = ActionContext<State, RootState>;
