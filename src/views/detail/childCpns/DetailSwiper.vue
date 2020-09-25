<template>
  <swiper>
    <swiper-item v-for="item in topImages" class="item">
      <img v-lazy="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from '../../../components/common/swiper/index'

  export default {
    name: "DetailSwiper",
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .item {
    text-align: center;
    background-color: #FEE0EA;
  }

  .item img {
    width: unset;
    height: 500px;
    vertical-align: middle;
  }
</style>
