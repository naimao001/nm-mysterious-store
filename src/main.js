import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './filters/filters'
import './plugins/plugins'
import 'element-ui/lib/theme-chalk/index.css';
import 'iview/dist/styles/iview.css';
import './assets/site/css/style.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    this.$axios.get("site/account/islogin").then(res => {
      if (res.data.code == "nologin") {
        router.push("/")
      } else {
        this.$store.commit('changeLogin',true)
      }
    })
  },
  render: h => h(App),
}).$mount('#app')
