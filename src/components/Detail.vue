<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a>&gt;
        <a href="/goods.html">购物商城</a>&gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box"></div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number
                          v-model="buyCount"
                          :min="1"
                          :max="goodsinfo.stock_quantity"
                          label="描述文字"
                        ></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <Affix>
              <div
                id="tabHead"
                class="tab-head"
                style="position: static; top: 517px; width: 925px;">
                <ul>
                  <li>
                    <a href="javascript:;" @click='tabIndex = 0' :class="{selected:tabIndex==0}">商品介绍</a>
                  </li>
                  <li>
                    <a href="javascript:;" @click='tabIndex = 1' :class="{selected:tabIndex==1}">商品评论</a>
                  </li>
                </ul>
              </div>
              </Affix>
              <div class="tab-content entry" v-show='tabIndex == 0' v-html='goodsinfo.content'></div>
              <div class="tab-content" v-show='tabIndex == 1' >
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                          v-model='commitTxt'
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="button"
                          value="提交评论"
                          class="submit"
                          @click='handlePost'
                        >
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p v-show='!commentsLsit'
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li v-for="item in commentsLsit" :key="item.id">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{item.user_name}}</span>
                          <span>{{item.add_time | dateformat}}</span>
                        </div>
                        <p>{{item.content}}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <div id="pagination" class="digg">
                       <Page :total="totalcount" show-sizer :page-size='pageSize' placement='top' 
                       @on-change='pageChange'/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="(item) in hotgoodslist" :key="item.id">
                    <div class="img-box">
                      <router-link  :to="'/detail/'+item.id" class="">
                        <img :src="item.img_url">
                      </router-link>
                    </div>
                    <div class="txt-box">
                      <router-link tag='a'  :to="'/detail/'+item.id" class="">{{item.title}}</router-link>
                      <span>{{item.add_time | dateformat}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <BackTop></BackTop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsinfo: {},
      imglist: [],
      hotgoodslist: [],
      buyCount: 1 ,
      tabIndex: 0,
      pageSize: 10,
      commentsLsit:[],
      totalcount: 0,
      pageIndex: 1,
      commitTxt:''
    };
  },
  methods: {
    getDetailData() {
      //artId
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${
            this.$route.params.artId
          }`
        )
        .then(res => {
          const data = res.data;
          this.goodsinfo = data.message.goodsinfo;
          this.imglist = data.message.imglist;
          this.hotgoodslist = data.message.hotgoodslist;
        });
    },
    getComments(pageIndex){
      this.$axios.get(`http://111.230.232.110:8899/site/comment/getbypage/goods/${this.$route.params.artId}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
      .then((res) => {
        const data = res.data
        this.commentsLsit = data.message
        this.totalcount = data.totalcount
        this.pageSize = data.pageSize
      })
    },
    pageChange(num){
      this.pageIndex = num
      this.getComments(this.pageIndex)
    },
    handlePost(){
      this.$axios.post(`http://111.230.232.110:8899/site/validate/comment/post/goods/${this.$route.params.artId}`,{
          commenttxt:this.commitTxt
      }).then((res) => {
        if (res.data.status == 0){
          console.log(res)
          this.getComments()
        }
      })
    }
  },
  created() {
    this.getDetailData();
    this.getComments()
  },
  watch:{
    $route(){
      this.getDetailData();
    }
  }
};
</script>
<style>
.tab-content {
  overflow: hidden;
}
.tab-content p {
  margin-top: 10px;
}
.tab-content ul li {
  margin-left: 10px
}
</style>