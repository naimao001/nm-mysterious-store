import Vue from "vue"
import VueRouter from "vue-router"
import Index from "../components/Index.vue"
import Detail from "../components/Detail.vue"
import ShopCar from "../components/ShopCar.vue"
import Order from "../components/Order.vue"
import Login from "../components/Login.vue"
import PayOrder from "../components/PayOrder.vue"
import PaySuccess from "../components/PaySuccess.vue"
import VipCenter from "../components/VipCenter.vue"
import OrderIndex from "../components/OrderIndex.vue"
import OrderList from "../components/OrderList.vue"
import OrderDetail from "../components/OrderDetail.vue"
import axios from "axios"
Vue.use(VueRouter)

let routes = [
  { path: "/", name: "Index", component: Index },
  { path: "/detail/:artId", name: "Detail", component: Detail },
  { path: "/shopcar", name: "ShopCar", component: ShopCar },
  {
    path: "/order/:ids",
    name: "Order",
    component: Order,
    meta: { checkLogin: true }
  },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/payorder/:ids",
    name: "PayOrder",
    component: PayOrder,
    meta: { checkLogin: true }
  },
  {
    path: "/paysuccess",
    name: "PaySuccess",
    component: PaySuccess,
    meta: { checkLogin: true }
  },
  {
    path: "/vipcenter",
    name: "VipCenter",
    component: VipCenter,
    meta: { checkLogin: true },
    children:[
      { path: '',component : OrderIndex,meta:{currentName:"会员中心首页"}},
      { path: 'orderlist',component : OrderList,meta:{currentName:"订单列表"}},
      { path: 'orderdetail/:ids',component : OrderDetail,meta:{currentName:"订单详情"}}
    ]
  }
]

const router = new VueRouter({
  routes,
  //每次跳到新路由 就会在页面顶部开始
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.checkLogin) {
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
