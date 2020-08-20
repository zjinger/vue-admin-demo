<template>
  <div>manual list works!</div>
</template>
<script>
import manualService from "api/manual";
const curdHandle = manualService.curdHandle;
export default {
  name: "ManualList",
  mounted() {
    curdHandle
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
