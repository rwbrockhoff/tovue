import Vue from "vue";
import Router from "vue-router";
import App from './App.vue';
import Start from './components/Start.vue';
import Akt from './components/Akt.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "start",
      component: Start
    },
    {
      path: "/akt",
      name: "akt",
      component: Akt
    }
  ]
});
