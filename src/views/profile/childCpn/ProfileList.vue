<template>
  <div class="profile-list">
    <div class="profile-list-item">
      <img src="../../../assets/img/profile/message.svg" alt="" class="profile-list-icon">
      <span>我的消息</span>
    </div>
    <div class="profile-list-item">
      <img src="../../../assets/img/profile/pointer.svg" alt="" class="profile-list-icon">
      <span>积分商城</span>
    </div>
    <div class="profile-list-item">
      <img src="../../../assets/img/profile/vip.svg" alt="" class="profile-list-icon">
      <span>会员卡</span>
    </div>
    <div class="line"></div>
    <div class="profile-list-item">
      <img src="../../../assets/img/profile/cart.svg" alt="" class="profile-list-icon">
      <span>我的购物车</span>
    </div>
    <div class="profile-list-item">
      <img src="../../../assets/img/profile/shopping.svg" alt="" class="profile-list-icon">
      <span>点赞购物APP</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileList"
  }
</script>

<style scoped>
  .profile-list {
    width: 100%;
  }

  .profile-list-item {
    display: flex;
    align-items: center;
    height: 45px;
    line-height: 45px;
    padding-left: 20px;
  }

  .profile-list-icon {
    width: 24px;
    height: 24px;
    margin-right: 7px;
  }

  .profile-list-item span {
    font-size: 16px;
    width: 100%;
    color: #333333;
    border-bottom: 1px solid #dddddd;
  }

  .profile-list-item:nth-child(3) span {
    border: 0;
  }

  .line {
    width: 100%;
    height: 10px;
    background-color: #eeeeee;
  }
</style>