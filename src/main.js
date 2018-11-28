import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import moment from 'moment';

import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'http://111.230.232.110:8899/'
//让ajax携带cookie
axios.defaults.withCredentials=true;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)
Vue.config.productionTip = false
import './assets/site/css/style.css'
Vue.filter('dateformat', (val) => {
    return moment(val).format('YYYY-MM-DD HH:mm:ss')
})
new Vue({
  router,
  store,
  created() {
    axios.get("site/account/islogin").then(res => {
      if (res.data.code == "nologin") {
        router.push("/login")
      } else {
        store.state.isLogin = true
      }
    })
  },
  render: h => h(App),
}).$mount('#app')
