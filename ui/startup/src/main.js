import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTag,
  faCalendarAlt,
  faMapMarkedAlt,
  faHeart,
  faQuestionCircle,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
// import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(faTag);
library.add(faCalendarAlt);
library.add(faMapMarkedAlt);
library.add(faHeart);
library.add(faQuestionCircle);
library.add(faMinus);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(Element, { locale });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
