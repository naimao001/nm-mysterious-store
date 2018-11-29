<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a>&gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车
            </h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li class="active">
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="收货人姓名" prop="accept_name">
                <el-input v-model="ruleForm.accept_name"></el-input>
              </el-form-item>
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
              </el-form-item>
              <el-form-item label="地区" prop="area">
                <v-distpicker
                  @selected="distpickerSelected"
                  :province="ruleForm.area.province.value"
                  :city="ruleForm.area.city.value"
                  :area="ruleForm.area.area.value"
                ></v-distpicker>
              </el-form-item>
              <el-form-item label="手机号码" prop="mobile">
                <el-input type="mobile" v-model="ruleForm.mobile" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱" prop="email">
                <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮政编码" prop="post_code">
                <el-input type="post_code" v-model="ruleForm.post_code" autocomplete="off"></el-input>
              </el-form-item>
              <h2 class="slide-tit">
                <span>2、支付方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>
                  <label>
                   <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>&nbsp;&nbsp;
                    <em>手续费：0.00元</em>
                  </label>
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>3、配送方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>
                  <label>
                   <el-radio
                        v-model="ruleForm.express_id"
                        @change="ruleForm.expressMoment=24"
                        label="1"
                      >顺丰</el-radio>&nbsp;&nbsp;
                      <em>费用：24.00元</em> &nbsp;&nbsp;
                      <el-radio
                        v-model="ruleForm.express_id"
                        @change="ruleForm.expressMoment=8"
                        label="2"
                      >韵达</el-radio>&nbsp;&nbsp;
                      <em>费用：8.00元</em> &nbsp;&nbsp;
                      <el-radio
                        v-model="ruleForm.express_id"
                        @change="ruleForm.expressMoment=10"
                        label="3"
                      >圆通</el-radio>&nbsp;&nbsp;
                      <em>费用：10.00元</em> &nbsp;&nbsp;
                      <span class="Validform_checktip"></span>
                  </label>
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>4、商品清单</span>
              </h2>
              <div class="line15"></div>
              <table
                width="100%"
                border="0"
                align="center"
                cellpadding="8"
                cellspacing="0"
                class="cart-table"
              >
                <tbody>
                  <tr>
                    <th colspan="2" align="left">商品信息</th>
                    <th width="84" align="left">单价</th>
                    <th width="84" align="center">购买数量</th>
                    <th width="104" align="left">金额(元)</th>
                  </tr>
                  <tr v-for="(item) in goodsList" :key="item.id">
                    <td width="68">
                      <router-link tag="a" :to="'/detail/'+item.id">
                        <img :src="item.img_url" class="img">
                      </router-link>
                    </td>
                    <td>
                      <router-link tag="a" :to="'/detail/'+item.id">{{item.title}}</router-link>
                    </td>
                    <td>
                      <span class="red">¥{{item.sell_price}}</span>
                    </td>
                    <td align="center">{{item.buycount}}</td>
                    <td>
                      <span class="red">{{item.sell_price*item.buycount}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="line15"></div>
              <h2 class="slide-tit">
                <span>5、结算信息</span>
              </h2>
              <div class="buy-foot clearfix">
                <div class="left-box">
                  <dl>
                    <dt>订单备注(100字符以内)</dt>
                    <dd>
                       <textarea
                          v-model="ruleForm.message"
                          name="message"
                          class="input"
                          style="height:150px;"
                        ></textarea>
                    </dd>
                  </dl>
                </div>
                <div class="right-box">
                  <p>
                    商品
                    <label class="price">{{totalCount}}</label>件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                    <label
                      id="goodsAmount"
                      class="price"
                    >{{totalPrice}}</label>元&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    运费：￥
                    <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label>元
                  </p>
                  <p class="txt-box">
                    应付总金额：￥
                    <label id="totalAmount" class="price">{{totalPrice+ruleForm.expressMoment}}</label>
                  </p>
                  <p class="btn-box">
                    <a class="btn button" href="/cart.html">返回购物车</a>
                    <a id="btnSubmit" @click="handleSubmit('ruleForm')" class="btn submit">确认提交</a>
                  </p>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  data() {
    var validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号~"));
      } else {
        if (this.ruleForm.mobile !== "") {
          let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
          if (!reg.test(value)) {
            callback(new Error("请输入正确的手机号~"));
          }
        }
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱~"));
      } else {
        if (this.ruleForm.email !== "") {
          let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
          if (!reg.test(value)) {
            callback(new Error("请输入正确的邮箱~"));
          }
        }
        callback();
      }
    };
    var validatePostCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮政编码~"));
      } else {
        if (this.ruleForm.post_code !== "") {
          let reg = /^[1-9]\d{5}(?!\d)$/;
          if (!reg.test(value)) {
            callback(new Error("请输入正确邮政编码~"));
          }
        }
        callback();
      }
    };
    return {
      goodsList: [],
      totalCount: 0,
      totalPrice: 0,
      ruleForm: {
        accept_name: "奶毛",
        address: "深圳",
        mobile: "18888888888",
        email: "naimao@qq.com",
        post_code: "123456",
        area: {
          province: { code: 440300, value: "广东省" },
          city: { code: 440300, value: "深圳市" },
          area: { code: 440306, value: "宝安区" }
        },
        payment_id:6,
        express_id:1,
        expressMoment:24
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { min: 2, max: 1000, message: "你家地址一个字???", trigger: "blur" }
        ],
        mobile: [{ validator: validateMobile, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
        post_code: [{ validator: validatePostCode, trigger: "change" }]
      }
    };
  },
  created() {
    this.getGoodData();
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.goodsAmount = this.totalPrice
            this.ruleForm.goodsids = this.$route.params.ids
            let obj = {}
            this.goodsList.forEach(v => {
              obj[v.id] = v.buycount 
            })
            this.ruleForm.cargoodsobj = obj 
            this.$axios.post('site/validate/order/setorder',this.ruleForm)
            .then((res) => {
              if (res.data.status==0){
                this.$router.push('/payOrder/'+res.data.message.orderid)
              }
            })
          } else {
            this.$Message.warnning('?????')
            return false;
          }
        });
    },
    getGoodData() {
      this.$axios
        .get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
        .then(res => {
          // console.log(res)
          res.data.message.forEach(item => {
            item.buycount = this.$store.state.cartData[item.id];
            this.totalCount += item.buycount;
            this.totalPrice += item.buycount * item.sell_price;
          });

          this.goodsList = res.data.message;
        });
    },
    distpickerSelected(area) {
      this.ruleForm.area = area;
    }
  },
  components: {
    VDistpicker
  }
};
</script>
<style>
</style>