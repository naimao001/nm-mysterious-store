<!--  -->
<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="#/" class="router-link-active">首页</a>&gt;
        <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <div class="left-220" style="margin: 0px;">
            <div class="banner-nav">
              <ul>
                <li v-for="(item) in catelist" :key="item.id">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span>{{item.title}}</span>
                    <p>
                      <span v-for="(it) in item.subcates" :key="it.id">{{it.title}}&nbsp;</span>
                    </p>
                  </h3>
                  <div class="item-box">
                    <dl>
                      <dt>
                        <a href="/goods/40.html">{{item.title}}</a>
                      </dt>
                      <dd>
                        <a
                          v-for="(it) in item.subcates"
                          :key="it.id"
                          href="/goods/43.html"
                        >{{it.title}}</a>
                      </dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--幻灯片-->
          <div class="left-705">
            <div class="banner-img">
              <el-carousel height="341px">
                <el-carousel-item v-for="item in sliderlist" :key="item.id">
                  <img :src="item.img_url" alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <!--/幻灯片-->
          <div class="left-220">
            <ul class="side-img-list">
              <li v-for="(item, index) in toplist" :key="index">
                <div class="img-box">
                  <label>{{index}}</label>
                  <img :src="item.img_url">
                </div>
                <div class="txt-box">
                  <a href="/goods/show-98.html">{{item.title}}</a>
                  <span>{{item.add_time | dateformat}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="section" v-for="(item) in goodslist" :key="item.level1cateid">..
      <div class="main-tit">
        <h2>{{item.catetitle}}</h2>
        <p>
          <a v-for="(it1) in item.level2catelist" :key="it1.subcateid" href="/goods/43.html">手机通讯</a>
          <a href="/goods/40.html">
            更多
            <i>+</i>
          </a>
        </p>
      </div>
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li v-for="(goods) in item.datas" :key="goods.artID">
              <router-link :to="'/detail/'+goods.artID" class="">
                <div class="img-box">
                  <img :src="goods.img_url">
                </div>
                <div class="info">
                  <h3>{{goods.artTitle}}</h3>
                  <p class="price">
                    <b>{{goods.sell_price}}</b>元
                  </p>
                  <p>
                    <strong>库存 {{goods.stock_quantity}}</strong>
                    <span>
                      市场价：
                      <s>{{goods.market_price}}</s>
                    </span>
                  </p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      catelist:[],
      sliderlist:[],
      toplist:[],
      goodslist:[]
    };
  },
  methods: {
    getBannerData(){
    this.$axios.get('http://111.230.232.110:8899/site/goods/gettopdata/goods')
    .then((res) => {
  const data = res.data
      this.catelist = data.message.catelist
      this.sliderlist = data.message.sliderlist
      this.toplist = data.message.toplist
    })
    },
    getGoodsData(){
     this.$axios.get('http://111.230.232.110:8899/site/goods/getgoodsgroup')
    .then((res) => {
      const data = res.data
      this.goodslist = data.message
    })
    }
  },
  mounted() {
   this.getBannerData()
   this.getGoodsData()
  },
}

</script>
<style>
.banner-img img {
  width: 100%;
}
</style>