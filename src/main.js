// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'
import Vuex from 'vuex'
Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(infiniteScroll);
Vue.use(VueLazyLoad,{
	loading:'/static/loading-svg/loading-bars.svg'
});

Vue.config.productionTip =false;
Vue.filter("currency",currency);

const store = new Vuex.Store({
	state:{
		cartNum:0
	},
	mutations:{
		updateCart(state,cartNum){
			state.cartNum += cartNum;
		},
		initCart(state,cartNum){
			state.cartNum = cartNum;
		}
	}

});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
