<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isAllSelected" @click.native="selectAll"/>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：{{ totalPrice }}
    </div>
    <div class="calculate" @click="calcClicked">
      去结算({{ checkedCount }})
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";

  import {mapGetters} from 'vuex';

  export default {
    name: "CartBottomBar",
    components: {CheckButton},
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '¥' + this.cartList.filter(item => item.checked).reduce(((previousValue, item) => {
          return previousValue + item.price * item.count;
        }), 0);
      },
      checkedCount() {
        return this.cartList.filter(item => item.checked).length;
      },
      isAllSelected() {
        if (this.cartList.length === 0)
          return false
        // 法1
        // return !(this.cartList.filter(item => !item.checked).length);
        // 法2 (找不到未选中的)
        return !(this.cartList.find(item => !item.checked));
      }
    },
    methods: {
      selectAll() {
        if (this.isAllSelected) {  // 全部已选中
          this.cartList.forEach(item => item.checked = false);
        } else {  // 有部分或全部不选中
          this.cartList.forEach(item => item.checked = true);
        }
      },
      calcClicked() {
        if (!this.isAllSelected) {
          this.$toast.show('请选择需要购买的商品', 2000);
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: relative;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background-color: #eeeeee;
  }

  .check-content {
    display: flex;
    margin-left: 10px;
    width: 60px;
    height: 40px;
    align-items: center;
  }

  .total-price {
    flex: 1;
    margin-left: 15px;
    padding-left: 10px;
    border-left: 2px solid #cccccc;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .calculate {
    width: 100px;
    text-align: center;
    background-color: pink;
  }
</style>
