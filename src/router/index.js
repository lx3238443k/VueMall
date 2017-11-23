import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from './../views/GoodsList'
import Cart from './../views/Cart'
import Address from './../views/Address'
import buyConfirm from './../views/buyConfirm'
import OrderSuc from './../views/OrderSuc'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'GoodsList',
      component: GoodsList
    },
    {
    		path:'/cart',
    		name:'Cart',
    		component:Cart
    },
      {
    		path:'/address',
    		name:'Address',
    		component:Address
    },
      {
    		path:'/buyconfirm',
    		name:'buyConfirm',
    		component:buyConfirm
    },
      {
    		path:'/orderSuccess',
    		name:'OrderSuc',
    		component:OrderSuc
    }
  ]
})
