<template>
  <div class="slide-bar">
    <scroll class="slide-bar-height">
      <div v-for="(item, index) in slideBarList">
        <button class="slide-bar-item"
                :class="currIndex === index ? 'active' : ''"
                :key="index"
                @click="slideBarItemClicked(item, index)"
        >
          {{ item.title }}
        </button>
      </div>
    </scroll>
  </div>
</template>

<script>
  // common cpn
  import Scroll from "../../../components/common/scroll/Scroll";

  export default {
    name: "SlideBar",
    components: {Scroll},
    props: {
      slideBarList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currIndex: 0
      }
    },
    methods: {
      slideBarItemClicked(item, index) {
        const obj = {
          maitKey: item.maitKey,
          index: index
        }
        this.currIndex = index
        this.$emit('slideBarItemClicked', obj);
      }
    }
  }
</script>

<style scoped>
  .slide-bar {
    width: 100%;
  }

  .slide-bar-height {
    position: fixed;
    left: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
    width: 100px;
    background-color: #f6f6f6;
  }

  .slide-bar-item {
    font-size: 14px;
    line-height: 45px;
    height: 45px;
    width: 100px;
    outline: none;
    border: 0;
    text-align: center;
    color: #666666;
    user-select: none;
    background: none;
  }

  .slide-bar-item.active {
    font-weight: 700;
    color: #ff5777;
    border-left: 3px solid #ff5777;
    background-color: #ffffff;
  }
</style>