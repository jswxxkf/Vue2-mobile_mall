<template>
  <div id="detail">
    <detail-nav-bar ref="detailNav" class="detail-nav" @titleClicked="titleClicked"/>
    <scroll class="content" ref="scroll" @scroll="pageScrolled" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-images-info :images-info="imagesInfo" @imgLoaded="imgLoaded"/>
      <detail-param-info ref="params" :param-info="paramsInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClicked" v-show="backTopIsShown"></back-top>
  </div>
</template>

<script>
  // sub cpn
  import DetailNavBar from "./childCpns/DetailNavBar";
  import DetailSwiper from "./childCpns/DetailSwiper";
  import DetailBaseInfo from "./childCpns/DetailBaseInfo";
  import DetailShopInfo from "./childCpns/DetailShopInfo";
  import DetailImagesInfo from "./childCpns/DetailImagesInfo";
  import DetailParamInfo from "./childCpns/DetailParamInfo";
  import DetailCommentInfo from "./childCpns/DetailCommentInfo";
  import DetailBottomBar from "./childCpns/DetailBottomBar";

  // common cpn
  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";
  import BackTop from "../../components/content/backTop/BackTop";

  // fn
  import {getDetail, getRecommend, GoodsInfo, ShopInfo, GoodsParams} from "../../network/detail.js";
  import {debounce} from "../../common/utils";

  // mixin
  import {backTopMixin, itemListenerMixin} from "../../common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailImagesInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        imagesInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommends: [],
        // 用于点击nav-bar中的标题，直接滚动到对应位置
        themeTopYs: []
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      this.iid = this.$route.params.iid;
      // 根据iid请求详情页数据
      getDetail(this.iid).then(res => {
        const data = res.result
        // 1.获取轮播图数据
        this.topImages = res.result.itemInfo.topImages
        // 2.获取商品数据,调用封装的ES6的class
        this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);
        // 3.获取店铺数据
        this.shop = new ShopInfo(data.shopInfo);
        // 4.获取下面的图片展示数据
        this.imagesInfo = data.detailInfo;
        // 5.获取尺寸参数信息
        this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule);
        // 6.获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
      });
      // 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      });
    },
    // mixin scope
    mounted() {
    },
    updated() {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    destroyed() {
      this.$bus.$off('itemImageLoaded', this.itemImgListener);
    },
    methods: {
      imgLoaded() {
        this.$refs.scroll.refresh()
      },
      titleClicked(index) {
        this.$refs.scroll.scrollTo(0, -(this.themeTopYs[index]), 1000);
      },
      pageScrolled(position) {
        // 获取y值
        const positionY = -position.y;
        const length = this.themeTopYs.length;
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i;
            this.$refs.detailNav.currentIndex = this.currentIndex;
          }
        }
        this.backTopIsShown = positionY >= 1000;
      },
      addToCart() {
        // 获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        console.log(product)
        // 2.将商品添加到购物车中
        
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 999;
    height: 100vh;
    background-color: #ffffff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

  .detail-nav {
    position: relative;
    z-index: 999;
    background-color: #ffffff;
  }
</style>
