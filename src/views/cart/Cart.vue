<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartCount }})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  // common cpn
  import NavBar from "../../components/common/navbar/NavBar";
  // sub cpn
  import CartList from "./childCpns/CartList";
  import CartBottomBar from "./childCpns/CartBottomBar";

  import {mapGetters} from 'vuex';

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // 两种语法
      ...mapGetters(['cartCount'])
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
    font-weight: 700;
  }
</style>
