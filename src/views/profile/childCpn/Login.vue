<template>
  <div class="login">
    <div class="avatar">
      <img src="../../../assets/img/profile/avatar.svg" alt="">
    </div>
    <div class="user-info">
      <span @click="toRegister">登录</span>
      <span>|</span>
      <span>注册</span>
      <div class="phone-num">
        <img src="../../../assets/img/profile/phone.svg" alt="">
        <p>暂未绑定手机号</p>
      </div>
    </div>
    <div class="profile-arrow-right">
      <img src="../../../assets/img/profile/pointer.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {}
    },
    methods:{
      toRegister(){
        this.$router.push('/register')
      }
    }
  }
</script>

<style scoped>
  .login {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 90px;
    padding: 0 20px;
    background-color: #ff8198;
  }

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #ffffff;
  }

  .avatar img {
    width: 60px;
    height: 60px;
    vertical-align: middle;
  }

  .user-info {
    color: #ffffff;
    font-size: 16px;
    margin-left: 20px;
  }

  .user-info span {
    margin-right: 15px;
  }

  .user-info p {
    margin-left: 3px;
  }

  .user-info .phone-num {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-top: 8px;
  }

  .phone-num img {
    width: 16px;
    height: 16px;
  }

  .profile-arrow-right {
    position: absolute;
    right: 10px;
    width: 20px;
    height: 20px;
    background-color: #ffffff;
  }

  .profile-arrow-right img {
    width: 20px;
    height: 20px;
  }
</style>