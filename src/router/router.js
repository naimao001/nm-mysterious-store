import Vue from "vue"
import VueRouter from "vue-router"
import Index from "../components/Index.vue"
import Detail from "../components/Detail.vue"
import ShopCar from "../components/ShopCar.vue"
import Order from "../components/Order.vue"
import Login from "../components/Login.vue"
import axios from "axios"
Vue.use(VueRouter)

let routes = [
  { path: "/", name: "Index", component: Index },
  { path: "/detail/:artId", name: "Detail", component: Detail },
  { path: "/shopcar", name: "ShopCar", component: ShopCar },
  { path: "/order/:ids", name: "Order", component: Order },
  { path: "/login", name: "Login", component: Login }
]

const router = new VueRouter({
  routes,
  //每次跳到新路由 就会在页面顶部开始
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.path.includes("/order")) {
    axios.get("site/account/islogin").then(res => {
      if (res.data.code == "nologin") {
        router.push("/login")
      } else {
          next()
      }
    })
  } else {
    next()
  }
})
export default router
