<!--  -->
<template>
  <div class="right-auto orderDetail">
    <div class="bg-wrap" style="min-height: 765px;">
      <div class="sub-tit">
        <a href="javascript:void(0)" class="add">
          <i class="iconfont icon-reply"></i>返回
        </a>
        <ul>
          <li class="selected">
            <a href="javascript:;">查看订单</a>
          </li>
        </ul>
      </div>
      <div class="order-progress">
        <ul>
          <li class="first" :class="{active:orderinfo.status>=1}">
            <div class="progress">下单</div>
            <div class="info">{{orderinfo.add_time | dateformat}}</div>
          </li>
          <li :class="{active:orderinfo.status>=2}">
            <div class="progress">已付款</div>
            <div class="info">{{orderinfo.confirm_time | dateformat}}</div>
          </li>
          <li :class="{active:orderinfo.status>=2}">
            <div class="progress">已经发货</div>
            <div class="info">{{orderinfo.express_time | dateformat}}</div>
          </li>
          <li :class="{active:orderinfo.status>=3}" class="last">
            <div class="progress">已完成</div>
            <div class="info">{{orderinfo.complete_time | dateformat}}</div>
          </li>
        </ul>
      </div>
      <div class="form-box accept-box form-box1">
        <dl class="head form-group">
          <dd>
            订单号：{{orderinfo.order_no}}
            <!-- <a 
              href="#/site/goods/payment/12"
              class="btn-pay"
            >-->
            <router-link
              v-show="orderinfo.status==1"
              class="btn-pay"
              :to="'/payOrder/'+orderinfo.id"
            >去付款</router-link>
            <a
              v-show="orderinfo.status==2||orderinfo.status==3"
              @click="receiveGoods"
              class="btn-pay"
            >确认收货</a>
            <a v-show="orderinfo.status==4" class="btn-pay">去评价</a>
            <!-- </a> -->
            <!---->
          </dd>
        </dl>
        <dl class="form-group">
          <dt>订单状态：</dt>
          <dd>{{orderinfo.statusName}}</dd>
        </dl>
        <dl class="form-group">
          <dt>快递单号：</dt>
          <dd>{{orderinfo.express_no | addSmlie('谢谢老板 🐷🐷🐷')}}</dd>
        </dl>
        <dl class="form-group">
          <dt>支付方式：</dt>
          <dd>{{orderinfo.paymentTitle}}</dd>
        </dl>
      </div>
      <div class="table-wrap">
        <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
          <tbody>
            <tr>
              <th align="left">商品信息</th>
              <th width="60%">名称</th>
              <th width="10%">单价</th>
              <th width="10%">数量</th>
              <th width="10%">金额</th>
            </tr>
            <!-- 商品列表 -->
            <tr v-for="(item) in goodslist" :key="item.goods_id">
              <td width="60">
                <img :src="item.imgurl" class="img">
              </td>
              <td align="left">
                <!-- <a
                  target="_blank"
                  href="/goods/show-92.html"
                >-->
                <router-link :to="'/detail/'+item.goods_id">{{item.goods_title}}</router-link>
                <!-- </a> -->
              </td>
              <td align="center">
                <s>￥{{item.goods_price}}</s>
                <p>￥{{item.real_price}}</p>
              </td>
              <td align="center">{{item.quantity}}</td>
              <td align="center">￥{{item.real_price*item.quantity}}</td>
            </tr>
            <tr>
              <td colspan="7" align="right">
                <p>
                  商品金额：
                  <b class="red">￥{{orderinfo.payable_amount}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                  <b class="red">￥{{orderinfo.express_fee}}</b>
                </p>
                <p style="font-size: 22px;">
                  应付总金额：
                  <b class="red">￥{{orderinfo.order_amount}}</b>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="form-box accept-box">
        <dl class="head form-group">
          <dd>收货信息</dd>
        </dl>
        <dl class="form-group">
          <dt>顾客姓名：</dt>
          <dd>{{orderinfo.accept_name}}</dd>
        </dl>
        <dl class="form-group">
          <dt>送货地址：</dt>
          <dd>{{orderinfo.area +orderinfo.address}}</dd>
        </dl>
        <dl class="form-group">
          <dt>联系电话：</dt>
          <dd>{{orderinfo.mobile}}</dd>
        </dl>
        <dl class="form-group">
          <dt>电子邮箱：</dt>
          <dd>{{orderinfo.email}}</dd>
        </dl>
        <dl class="form-group">
          <dt>备注留言：</dt>
          <dd>{{orderinfo.message}}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodslist: [],
      orderinfo: {}
    };
  },
  methods: {
    getOrderDetailData() {
      this.$axios
        .get(`site/validate/order/getorderdetial/${this.$route.params.ids}`)
        .then(res => {
          this.goodslist = res.data.message.goodslist;
          this.orderinfo = res.data.message.orderinfo;
        });
    },
    receiveGoods() {
      this.$confirm("确认收货????", "不温馨提示", {
        confirmButtonText: "gogogo",
        cancelButtonText: "滚~",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get("site/validate/order/complate/" + this.$route.params.ids)
            .then(res => {
              if (res.data.status == 0)
              this.$message({
                type: "success",
                message: res.data.message
              });
              this.getOrderDetailData()
              
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "狗贼~"
          });
        });
    }
  },
  created() {
    this.getOrderDetailData();
  },
  filters:{
    addSmlie(val,smlie){
      return val + smlie
    }
  }
};
</script>
<style lang='scss' scoped>
.sub-tit {
  padding-top: 0;
}
</style>