<template>
  <div class="category">
    <nav-bar class="category-nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <slide-bar :slide-bar-list="categoryList" @slideBarItemClicked="slideBarItemClicked"/>
    <scroll class="scroll-height" ref="scroll">
      <sub-category :sub-category-list="subCategoryList"/>
      <tab-control :titles="titleList" @tabClicked="tabClicked" ref="tabControl"/>
      <goods-list :goods="categoryDetailList"/>
    </scroll>
  </div>
</template>

<script>
  // common cpn
  import NavBar from "../../components/common/navbar/NavBar";
  import Scroll from "../../components/common/scroll/Scroll";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";

  // sub cpn
  import SlideBar from "./childCpn/SlideBar";
  import SubCategory from "./childCpn/SubCategory";

  // fn
  import {getCategory, getSubCategory, getCategoryDetail} from "../../network/category";

  // mixin
  import {itemListenerMixin} from "../../common/mixin";

  export default {
    name: "Category",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      SlideBar,
      SubCategory
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        // 分类侧边栏数据
        categoryList: [],
        titleList: ['流行', '新款', '精选'],
        currIndex: 0,
        // 侧边栏右侧分类数据
        subCategoryList: [],
        categoryDetailList: []
      }
    },
    methods: {
      getCategory() {
        getCategory().then(res => {
          // console.log(res);
          this.categoryList = res.data.category.list;
          // 每次切换分类 初始化tabControl的索引
          this.$refs.tabControl.currentIndex = 0;
          // 下一帧延迟处理
          this.$nextTick(() => {
            this.getSubCategory(this.categoryList[0].maitKey)
            this.getCategoryDetail(this.categoryList[0].miniWallkey, 'pop');
          });
        });
      },
      getSubCategory(key) {
        getSubCategory(key).then(res => {
          this.subCategoryList = [...res.data.list];
        });
      },
      getCategoryDetail(key, type) {
        getCategoryDetail(key, type).then(res => {
          this.categoryDetailList = [...res];
          console.log(this.categoryDetailList)
        });
      },
      slideBarItemClicked({maitKey, index}) {
        // 阻止反复请求
        if (this.currIndex === index) return;
        this.currIndex = index;
        // 请求对应的子分类列表及推荐列表
        this.getSubCategory(maitKey)
        this.getCategoryDetail(this.categoryList[this.currIndex].miniWallkey, 'pop');
      },
      tabClicked(index) {
        const typeList = ['pop', 'new', 'sell'];
        // 切换数据展示类型
        this.getCategoryDetail(this.categoryList[this.currIndex].miniWallkey, typeList[index])
      }
    },
    created() {
      this.getCategory()
    },
    deactivated() {
      this.$bus.$off('itemImageLoaded', this.itemImgListener);
    }
  }
</script>

<style scoped>
  .category-nav-bar {
    font-weight: 700;
    color: #ffffff;
    background-color: #ff8198;
  }

  .scroll-height {
    position: fixed;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 100px;
    overflow: hidden;
  }
</style>
