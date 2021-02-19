<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: 'app',
  created() {
    if (sessionStorage.eleToken) {
      // 解析token
      const decodeToken = jwt_decode(sessionStorage.eleToken);
      // 解析的token存储到vuex中
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decodeToken));
      this.$store.dispatch("setUser", decodeToken);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50; 
  height: 100%;
}
</style>
