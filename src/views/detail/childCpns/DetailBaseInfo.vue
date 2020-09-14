<template>
  <!-- 若传入的goods对象为空对象，则不进行任何渲染 -->
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.price }}</span>
      <span class="o-price">¥{{ goods.lowPrice }}~¥{{ goods.highPrice }}</span>
      <span class="discount" v-if="goods.discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length - 1" :key="index">
        <!-- 注意遍历出的index是从【1】开始的 -->
        <img v-if="goods.services[index - 1].icon" :src="goods.services[index - 1].icon" alt="">
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    // computed:{
    //   newPrice(){
    //     return (parseFloat(this.goods.oldPrice.replace('¥','')) * parseFloat(this.goods.discount.replace('折','')) / 10).toFixed(2)
    //   }
    // }
  }
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title {
    color: #222222;
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    font-size: 22px;
    color: var(--color-high-text);
  }

  .info-price .o-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }

  .info-price .discount {
    /*使用相对定位 让元素上浮一些*/
    position: relative;
    top: -8px;
    margin-left: 5px;
    padding: 2px 5px;
    color: #ffffff;
    font-size: 12px;
    background-color: var(--color-high-text);
    border-radius: 8px;
  }

  .info-other {
    display: flex;
    margin-top: 15px;
    line-height: 30px;
    font-size: 13px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    justify-content: space-between;
  }

  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

  .info-service-item img {
    position: relative;
    top: 1px;
    width: 14px;
    height: 14px;
  }

  .info-service-item span {
    font-size: 13px;
    color: #333333;
  }
</style>
