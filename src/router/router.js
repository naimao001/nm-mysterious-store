import Vue from "vue"
import VueRouter from "vue-router"
import Index from "../components/Index.vue"
import Detail from "../components/Detail.vue"
Vue.use(VueRouter)

let routes = [ { path: "/", name: "Index", component: Index },
{path:"/detail/:artId",name:"Detail",component: Detail}
]

const router = new VueRouter({
  routes,
   //每次跳到新路由 就会在页面顶部开始
   scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
