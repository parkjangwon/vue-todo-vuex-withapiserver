import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios';
import todoApp from './modules/todoApp'

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export const store = new Vuex.Store({
	modules: {
		todoApp
	}
});
