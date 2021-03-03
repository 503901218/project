import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { createApp } from 'vue'
import App from './App.vue'
// import Vue from 'vue'
import Router from 'vue-router'
// Vue.use(Router)

createApp(App).use(ElementPlus,Router).mount('#app')

// new Vue({
//     render: h => h(App),
//     router,
//     store
//   }).$mount('#app')

// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
// // import { createApp } from 'vue'
// import App from './App.vue'
// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)

// createApp(App).use(ElementPlus,Router).mount('#app')
// new Vue({
//     render: h => h(App),
//     Router,
//     // store,
//     ElementPlus
//   }).$mount('#app')