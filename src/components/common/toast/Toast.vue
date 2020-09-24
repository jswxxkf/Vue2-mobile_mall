<template>
  <div class="toast" :class="{hidden: !isToastShown}">
    <div v-show="isToastShown">{{ message }}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      message: {
        type: String,
      },
      isToastShown: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      show(message = '默认文字', duration = 2000) {
        this.message = message;
        this.isToastShown = true;
        setTimeout(() => {
          this.isToastShown = false;
          this.message = '';
        }, duration);
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    color: #ffffff;
    z-index: 999;
    background-color: rgba(0, 0, 0, .7);
  }

  .hidden {
    background-color: transparent;
  }
</style>
