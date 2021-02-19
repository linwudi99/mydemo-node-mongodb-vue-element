<template> 
  <el-container class="myContainer">
    <el-aside>
      <aside-menu></aside-menu>
    </el-aside>    
    <el-container>
      <el-header>
        <header-nav></header-nav>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>     
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import asideMenu from '@/components/AsideMenu.vue'
import headerNav from '@/components/HeaderNav.vue'

export default {
  name: 'home',
  components: {
    asideMenu,
    headerNav
  },
  data() {
    return {
      
    }
  }
}
</script>
<style lang="scss">
  .myContainer{
    height: 100%;
    .el-aside{
      width: 240px!important;
      background-color: #545c64;
    }
    .el-header{
      padding: 0;
    }
  }
</style>
