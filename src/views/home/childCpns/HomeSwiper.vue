<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoaded">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "../../../components/common/swiper/index.js"

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoaded: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imgLoaded() {
        if (!this.isLoaded) {
          this.$emit('swiperImageLoaded')
          this.isLoaded = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
