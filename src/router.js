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
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
