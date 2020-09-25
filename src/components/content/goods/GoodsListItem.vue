<template>
  <div class="goods-list-item" @click="itemClicked">
    <img :src="showImage" alt="" @load="imgLoaded">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imgLoaded() {
        this.$bus.$emit('itemImageLoaded')
      },
      itemClicked() {
        const id = this.goodsItem.iid || this.goodsItem.item_id
        this.$router.push('/detail/' + id);
      }
    }
  }
</script>

<style scoped>
  .goods-list-item {
    position: relative;
    padding-bottom: 40px;
    width: 48%;
  }

  .goods-list-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    position: absolute;
    /*overflow: hidden;*/
    left: 0;
    right: 0;
    bottom: 5px;
    font-size: 12px;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    position: absolute;
    content: '';
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
