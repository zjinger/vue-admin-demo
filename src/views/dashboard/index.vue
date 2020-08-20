<template>
  <div class="dashboard">
    <div v-for="index of 15 " :key="index">
      <span>{{index+1}}</span>
      <img alt="Vue logo" src="../../assets/logo.png" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Dashboard",
  components: {
  }
};
</script>