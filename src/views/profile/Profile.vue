<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">
        我的Vue商城
      </div>
    </nav-bar>
    <scroll class="contents">
      <login/>
      <money/>
      <div class="line"></div>
      <profile-list/>
    </scroll>
  </div>
</template>

<script>
  // common cpn
  import NavBar from "../../components/common/navbar/NavBar";
  import Scroll from "../../components/common/scroll/Scroll";

  // sub cpn
  import Login from "./childCpn/Login";
  import Money from "./childCpn/Money";
  import ProfileList from "./childCpn/ProfileList";

  export default {
    name: "Profile",
    components: {
      Scroll,
      NavBar,
      Login,
      Money,
      ProfileList,
    },
  }
</script>

<style scoped>
  .nav-bar {
    font-weight: 600;
    color: #ffffff;
    background-color: #ff8198;
  }

  .contents { /* 脱标 */
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
    overflow: hidden;
  }

  .line {
    width: 100%;
    height: 5px;
    background-color: #eeeeee;
  }
</style>
