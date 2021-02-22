<template>
  <div class="main-container">
    <img src="../assets/1.gif" alt="">
    <p>首 页</p>
  </div>
</template>

<script>
export default {
  name: 'container',
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.main-container{
  text-align: center;
  padding-top: 150px;
  p{
    font-size: 50px;
    font-weight: 600;
    -webkit-text-fill-color: transparent;
    background-image:  -webkit-linear-gradient(left,#129835,#ece648 25%,#129835 50%,#F9E92B 75%,rgb(40, 150, 38));
    background-size: 200%,100%;
    -webkit-background-clip: text;
    -webkit-animation: word 5s linear infinite ;
  }
  @keyframes word {
    0%{background-position: 0 0}
    100%{background-position: -100% 0}
  }
}
</style>