<template>
  <div class="category-detail">
    <div v-for="(item, index) in subCategoryList" :key="index" class="detail-item">
      <a :href="item.link"><img :src="item.image" alt=""></a>
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SubCategory",
    props: {
      subCategoryList: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .category-detail {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
  }

  .detail-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 85px;
    height: 100px;
    margin-bottom: 10px;
  }

  .detail-item img {
    width: 70px;
    margin-bottom: 5px;
  }

  .detail-item p {
    font-size: 14px;
  }
</style>