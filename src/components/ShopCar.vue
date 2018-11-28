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
                <li>
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
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table
              width="100%"
              align="center"
              class="cart-table"
              border="0"
              cellspacing="0"
              cellpadding="8"
            >
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <a>选择</a>
                  </th>
                  <th align="center">商品信息</th>
                  <th width="84" align="center">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="center">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <tr v-for="(item) in goodsList" :key="item.id">
                  <td>
                    <el-switch
                      v-model="item.isSelected"
                      active-color="#13ce66"
                      inactive-color="#bbbbbb"
                    ></el-switch>
                  </td>
                  <td>
                    <img :src="item.img_url" alt>
                    <span>{{item.title}}</span>
                  </td>
                  <td>{{item.sell_price}}</td>
                  <td>
                    <el-input-number size="mini" v-model="item.buycount" :min="0"></el-input-number>
                  </td>
                  <td>{{item.sell_price * item.buycount}}</td>
                  <td>
                    <el-button @click="delOne(item.id)" type="danger" icon="el-icon-delete" circle></el-button>
                  </td>
                </tr>
                <tr v-show="!goodsList.length">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>
                          您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{selectCount}}</b>件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{totalPriceNum}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
              <router-link :to="'/order/'+selectIds">
                <button class="submit">立即结算</button>
              </router-link>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
    }
  },
  created() {
    let ids = ""
    for (const key in this.$store.state.cartData) {
      ids += key
      ids += ","
    }
    ids = ids.slice(0, ids.length - 1)
    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(res => {
      res.data.message.forEach(item => {
        item.buycount = this.$store.state.cartData[item.id]
        item.isSelected = true
      })
      this.goodsList = res.data.message
    })
  },
  computed: {
    selectCount() {
      let num = 0
      this.goodsList.forEach(v => {
        if (v.isSelected) {
          num += v.buycount
        }
      })
      return num
    },
    totalPriceNum(){
      let price = 0
      this.goodsList.forEach(v => {
        if (v.isSelected) {
          price += (v.sell_price*v.buycount)
        }
      })
      return price
    },
    selectIds(){
      let arr = []
      this.goodsList.forEach((item) => {
        if (item.isSelected) {
          arr.push(item.id)
        }
      })
      return arr.join(',')
    }
  },
  methods:{
    delOne(id){
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '滚',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let index =  this.goodsList.findIndex((item) => {
            return item.id == id
          })
          this.goodsList.splice(index,1)
          // this.$store.commit('delGoodsById',id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    }
  },
  watch:{
    goodsList:{
      deep:true,
      handler:function(val){
        //深度监视 val 和oVal是一样的
        let  obj = {}
        val.forEach((v) => {
          obj[v.id] = v.buycount
        })
        this.$store.commit('updateCartData',obj)
      }
    }
  }
}
</script>

<style>
td img {
  width: 100px;
  margin-right: 10px;
}
td:nth-child(2) {
  display: flex;
  align-items: center;
}
td {
  text-align: center;
}
</style>
