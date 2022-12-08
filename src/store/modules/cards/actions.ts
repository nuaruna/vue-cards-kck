import * as jsonData from '@/database.json';
import moment from 'moment';
import { TActionContext } from './interfaces';
import * as types from './mutation-types';

const getFormattedType = (type: string) => {
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
};

export default {
  fetchAllCards(
    { commit }: TActionContext,
  ): boolean {
    const keys = Object.keys(jsonData);
    const correctKeys = keys.filter((key) => !Number.isNaN(Number(key)));
    let data = correctKeys.map((key: string) => jsonData[key]);
    data = data.map((item) => ({
      ...item,
      formattedType: getFormattedType(item.type),
      formattedDate: moment(item.creationDate).format('DD.MM.YYYY hh:mm:ss'),
    }));
    commit(types.SET_CARDS, data);
    return true;
  },

  deleteCard(
    { commit }: TActionContext,
    id: string,
  ):boolean {
    commit(types.DELETE_CARD, id);
    return true;
  },
};
