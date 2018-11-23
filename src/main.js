import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui';
import iView from 'iview';
import moment from 'moment';
import axios from 'axios'
import 'iview/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css';


Vue.prototype.$axios = axios
Vue.use(ElementUI);
Vue.use(iView);

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.config.productionTip = false
import './assets/site/css/style.css'
Vue.filter('dateformat', (val) => {
    return moment(val).format('YYYY-MM-DD HH:mm:ss')
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
