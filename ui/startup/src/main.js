import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTag, faCalendarAlt, faMapMarkedAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(faTag);
library.add(faCalendarAlt);
library.add(faMapMarkedAlt);
library.add(faHeart);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(Element);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
