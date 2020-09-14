<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClicked">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
             class="title-item"
             :class="{active:index === currentIndex}"
             @click="titleClicked(index)"
        >
          <span>{{ item }}</span>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        currentIndex: 0,
        titles: ['商品', '参数', '评论', '推荐']
      }
    },
    methods: {
      titleClicked(index) {
        this.currentIndex = index;
        this.$emit('titleClicked', index);
      },
      backClicked() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 2px solid var(--color-tint);
  }

  .back img{
    margin-top: 12px;
  }
</style>
