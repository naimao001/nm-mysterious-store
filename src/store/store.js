import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartData: JSON.parse(localStorage.getItem("cartData")) || {},
    isLogin:false
  },
  mutations: {
    addCart(state, obj) {
      if (state.cartData[obj.id]) {
        //有则相加
        state.cartData[obj.id] += obj.num
      } else {
        //无则添加
        Vue.set(state.cartData, obj.id, obj.num)
      }
    },
    updateCartData(state, obj) {
      state.cartData = obj
    }
    // delGoodsById(state,id){
    //  Vue.delete(state.cartData,id)
    // }
    ,
    changeLogin(state,islogin){
      state.isLogin = islogin
    }
  },
  getters: {
    totalCount(state) {
      let totalCount = 0
      for (let key in state.cartData) {
        totalCount += state.cartData[key]
      }
      return totalCount
    }
  },
  actions: {}
})
window.onbeforeunload = function() {
  localStorage.setItem("cartData", JSON.stringify(store.state.cartData))
}
export default store
