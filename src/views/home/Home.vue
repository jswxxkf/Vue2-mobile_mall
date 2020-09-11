<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClicked="tabClicked"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"
    ></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScrolled"
            @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoaded="swiperImageLoaded"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClicked="tabClicked"
                   ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClicked" v-show="backTopIsShown"></back-top>
  </div>
</template>

<script>
  // sub cpn
  import HomeSwiper from "./childCpns/HomeSwiper.vue";
  import RecommendView from "./childCpns/RecommendView.vue";
  import FeatureView from "./childCpns/FeatureView.vue";

  // common cpn
  import NavBar from "../../components/common/navbar/NavBar.vue";
  import TabControl from "../../components/content/tabControl/TabControl.vue";
  import GoodsList from "../../components/content/goods/GoodsList.vue";
  import Scroll from "../../components/common/scroll/Scroll.vue";
  import BackTop from "../../components/content/backTop/BackTop.vue";

  // fn
  import {getHomeMultiData, getHomeGoods} from "../../network/home.js";
  import {debounce} from "../../common/utils.js";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        backTopIsShown: false,
        isTabFixed: false,
        tabOffsetTop: 0,
        // 离开时保存的位置
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultiData()
      // 2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {  // *** 特别注意：访问子组件/子元素必须等待挂载完成，尽管是在回调中写的(但万一很快呢) ***
      // 3.监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 50);
      this.$bus.$on('itemImageLoaded', () => {
        // this.$refs.scroll.refresh();
        refresh()  // 刷新过于频繁，需要防抖函数
      });
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
    },
    methods: {
      /**
       * 事件监听相关方法
       */
      tabClicked(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break
          case 1:
            this.currentType = 'new';
            break
          case 2:
            this.currentType = 'sell';
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClicked() {
        // 通过$refs取到子组件Scroll中的scrollTo方法，500ms内回到顶部
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      contentScrolled(position) {
        // 1. 判断BackTop是否显示
        this.backTopIsShown = -(position.y) >= 1000;
        // 2. 判断TabControl是否吸顶 (position:fixed)
        this.isTabFixed = -(position.y) >= this.tabOffsetTop;
      },
      loadMore() {
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoaded() {
        // 所有的组件都有一个属性$el，用于获取其根元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        // console.log(this.tabOffsetTop);
      },
      /**
       * 网络请求相关方法
       */
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        });
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        });
      }
    }
  }
</script>

<style scoped>
  #home {
    position: relative;
    height: 100vh;
    /*padding-top: 44px;*/
  }

  .home-nav {
    /* 在使用浏览器原生滚动时，为了让其不动 现使用better-scroll,故不再需要 */
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
    background-color: var(--color-tint);
    color: #ffffff;
  }

  .tab-control {
    position: relative;
    z-index: 999;
  }

  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
