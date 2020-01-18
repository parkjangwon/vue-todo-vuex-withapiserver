import Vue from 'vue';
import App from './App.vue';
import { store } from './store/store.js';

Vue.config.productionTip = false;

console.log(process.env.VUE_APP_MODE);

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
