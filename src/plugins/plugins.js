import Vue from "vue"
import axios from "axios"
Vue.prototype.$axios = axios
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded"
axios.defaults.baseURL = "http://111.230.232.110:8899/"
//让ajax携带cookie
axios.defaults.withCredentials = true

import ProductZoomer from "vue-product-zoomer"
Vue.use(ProductZoomer)

import { InputNumber, Carousel, CarouselItem, 
  Pagination,Switch,Button,Notification,Message,MessageBox,
  Form,FormItem,Input,Radio} from "element-ui"
Vue.use(InputNumber)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Radio);
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

import iView from "iview"
Vue.use(iView)
