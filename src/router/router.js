import Vue from "vue"
import VueRouter from "vue-router"
import Index from "../components/Index.vue"
import Detail from "../components/Detail.vue"
import ShopCar from "../components/ShopCar.vue"
import Order from "../components/Order.vue"
Vue.use(VueRouter)

let routes = [
  { path: "/", name: "Index", component: Index },
  { path: "/detail/:artId", name: "Detail", component: Detail },
  { path: "/shopcar", name: "ShopCar", component: ShopCar },
  { path: "/order", name: "Order", component: Order }
]

const router = new VueRouter({
  routes,
  //每次跳到新路由 就会在页面顶部开始
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
