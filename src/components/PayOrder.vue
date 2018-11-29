<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a href="javascript:;" class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-18">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{orderList.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{orderList.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{orderList.area}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{orderList.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{orderList.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                      <dd>{{orderList.message}}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="el-col el-col-6">
                <div id="container2">
                  <qrcode
                    :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+this.$route.params.ids"
                    :options="{ size: 200 }"
                  ></qrcode>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueQrcode from "@xkeshi/vue-qrcode";
export default {
  data() {
    return {
      orderList: {},
      timeId: null,
    };
  },
  components: {
    [VueQrcode.name]: VueQrcode
  },
  created() {
    this.getOrderData();
    this.timeId = setInterval(this.getAjaxLoop, 2000);
  },
  methods: {
    getOrderData() {
      this.$axios
        .get(`site/validate/order/getorder/${this.$route.params.ids}`)
        .then(res => {
          this.orderList = res.data.message[0];
        });
    },
    getAjaxLoop() {
      //ajax轮询看订单有没有支付完成 支付完成跳转到支付成功页面
      this.$axios
        .get(`site/validate/order/getorder/${this.$route.params.ids}`)
        .then(res => {
          let status = res.data.message[0].status;
          if (status == 2) {
            this.$Message.success("支付成功!!!小老弟~");
            this.$router.push("/paysuccess");
          }
        });
    }
  },
  destroyed() {
    clearInterval(this.timeId);
  }
};
</script>
<style lang='scss' scoped>
</style>