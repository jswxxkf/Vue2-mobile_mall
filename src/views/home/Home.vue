<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar.vue";
  import HomeSwiper from "./childCpns/HomeSwiper";
  import RecommendView from "./childCpns/RecommendView";

  import {getHomeMultiData} from "../../network/home.js";

  export default {
    name: "Home",
    components: {
      RecommendView,
      NavBar,
      HomeSwiper,
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      // 1.请求多个数据
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
