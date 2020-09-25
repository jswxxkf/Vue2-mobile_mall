// 商品图片加载完成监听器对应的混入
import {debounce} from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 使用防抖函数，传入频繁操作的函数，返回新刷新函数
    let newRefresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImgListener = () => {  // Closure
      // this.$refs.scroll.refresh();
      newRefresh()  // 刷新过于频繁，需要新刷新函数
    };
    // 监听item中图片加载完成
    this.$bus.$on('itemImageLoaded', this.itemImgListener);
    // test
    // console.log('我是混入的内容')
    // setTimeout(() => {
    //   this.$refs.scroll.refresh();
    // }, 1000);
  }
}

export const backTopMixin = {
  data() {
    return {
      backTopIsShown: false
    }
  },
  methods: {
    backClicked() {
      // 通过$refs取到子组件Scroll中的scrollTo方法，500ms内回到顶部
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }
}
