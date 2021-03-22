import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/details/layouts/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/details/login/Login.vue'),
    meta: {
      title: '登录'
    }
  }, {
    path: '',
    component: Layout,
    children: [{
      path: '',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页'
      }
    }, {
      path: 'goods',
      name: 'goods',
      component: () => import('../views/details/goods/Goods.vue'),
      meta: {
        title: '商品'
      }
    }, {
      path: 'order',
      name: 'order',
      component: () => import('../views/details/order/Order.vue'),
      meta: {
        title: '订单'
      }
    }, {
      path: 'marketing',
      name: 'marketing',
      component: () => import('../views/details/marketing/Marketing.vue'),
      meta: {
        title: '营销'
      }
    }, {
      path: 'members',
      name: 'members',
      component: () => import('../views/details/members/Members.vue'),
      meta: {
        title: '会员'
      }
    }, {
      path: 'members',
      name: 'members',
      component: () => import('../views/details/members/Members.vue'),
      meta: {
        title: '会员'
      }
    }, {
      path: 'financial',
      name: 'financial',
      component: () => import('../views/details/financial/Financial.vue'),
      meta: {
        title: '财务'
      }
    }, {
      path: 'data',
      name: 'data',
      component: () => import('../views/details/data/Data.vue'),
      meta: {
        title: '数据'
      }
    }, {
      path: 'store',
      name: 'store',
      component: () => import('../views/details/store/Store.vue'),
      meta: {
        title: '店铺'
      }
    }, {
      path: 'setting',
      name: 'setting',
      component: () => import('../views/details/setting/Setting.vue'),
      meta: { title: '设置' }
    }]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
