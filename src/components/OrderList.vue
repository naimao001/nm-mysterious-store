<template>
  <div class="right-auto">
    <div class="bg-wrap" style="min-height: 765px;">
      <div class="sub-tit">
        <ul>
          <li class="selected">
            <a href="/user/order-list.html">交易订单</a>
          </li>
        </ul>
      </div>
      <div class="table-wrap">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
          <tbody>
            <tr>
              <th width="16%" align="left">订单号</th>
              <th width="10%">姓名</th>
              <th width="12%">订单金额</th>
              <th width="11%">下单时间</th>
              <th width="10%">状态</th>
              <th width="12%">操作</th>
            </tr>
            <tr v-for="(item) in orderList" :key="item.id">
              <td>{{item.order_no}}</td>
              <td align="left">{{item.accept_name}}</td>
              <td align="left">
                <strong style="color: red;">￥{{item.order_amount}}</strong>
                <br>在线支付
              </td>
              <td align="left">{{item.add_time}}</td>
              <td align="left">{{item.statusName}}</td>
              <td align="left">
                <router-link :to="`/vipcenter/orderdetail/${item.id}`" class>查看订单</router-link>
                <a
                  v-show="item.status!=2"
                  :href="`http://111.230.232.110:8899/site/validate/pay/alipay/${item.id}`"
                  class
                >|去付款</a>
                <!-- <a href="javascript:void(0)">|取消</a> -->
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page-foot">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 20, 25]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalcount"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      orderList: [],
      totalcount: 0
    };
  },
  methods: {
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getOrderListData();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.pageIndex = 1
      this.getOrderListData();
    },
    getOrderListData() {
      this.$axios
        .get(
          `site/validate/order/userorderlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(res => {
          this.orderList = res.data.message;
          this.totalcount = res.data.totalcount;
        });
    }
  },
  created() {
    this.getOrderListData();
  }
};
</script>
<style lang='scss' scoped>
.sub-tit {
  padding-top: 0;
}
td:nth-child(2) {
  display: block;
}
td a {
  display: block;
}
</style>