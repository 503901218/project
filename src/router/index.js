import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router);

// 设置可跳转路由
const page1=()=>import('../view/page1/page1.vue')
const page2=()=>import('../view/page2/page2.vue')

// 导出路由
export default new Router({
   routes:[
       {
           name:'page1',
           path:'/',
           component:page1
       },
       {
        name:'page2',
        path:'/page2',
        component:page2
       },
   ],
   mode:'history'
})