<template>
  <div class="error404">
    <img :src="imgSrc" alt="">
    <el-button type="primary" style="width:150px" @click="back">返回首页</el-button>
  </div>
</template>

<script>
export default {
  name: 'error404',
  data() {
    return {
      imgSrc:require("../assets/404.gif")
    };
  },
  created() {},
  mounted() {},
  methods: {
    back(){
      this.$router.push('/home')
    }
  },
};
</script>

<style lang="scss">
.error404{
  height: 100%;
  text-align: center;
  img{
    height: 80%;
    width: 100%;
  }
}
</style>