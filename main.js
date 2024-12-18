import App from './App'
import {
	provide,
	inject
} from 'vue';
// 导入pinia
import {
	createPinia
} from 'pinia'
import api from './api/index.js'


import {
	counterStore
} from './store/index.js'

// #ifndef VUE3

import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
import share from '@/config/share.js'
Vue.mixin(share)
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()

// #endif

// #ifdef VUE3

import {
	createSSRApp
} from 'vue'
export function createApp() {

	const app = createSSRApp(App)
	const pinia = createPinia()
	app.use(pinia)
	app.config.globalProperties.$api = api;
	app.config.globalProperties.$store = counterStore();

	return {
		app
	}
}
// #endif
