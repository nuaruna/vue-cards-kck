import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import CardsView from '../views/CardsView.vue';
import TableView from '../views/TableView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'tableView',
    component: TableView,
  },
  {
    path: '/cards',
    name: 'cardsView',
    component: CardsView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
