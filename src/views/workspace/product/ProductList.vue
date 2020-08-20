<template>
  <div>product-list works!</div>
</template>
<script>
import productService from "api/product";
export default {
  name: "ProductList",
  mounted() {
    productService
      .getList({ currentPage: 1, pageRecord: 10 })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style lang="less" scoped>
</style>
