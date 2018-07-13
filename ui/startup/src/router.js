import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Hosts from './views/Hosts.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/become-a-host',
      name: 'become-a-host',
      component: Hosts,
    },
  ],
});
