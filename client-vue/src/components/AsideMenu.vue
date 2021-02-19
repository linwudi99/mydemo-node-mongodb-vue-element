<template>
  <div class="myAsideMenu">
    <div class="logo">
      <img src="../assets/logo2.jpg" alt="">
      <span>资金管理</span>
    </div>    
    <el-menu :default-openeds="['1', '2', '3']" background-color="#545c64" text-color="#fff" active-text-color="#4998FC">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <el-menu-item-group>          
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
        <el-menu-item-group>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'asideMenu',
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
.myAsideMenu{
  .logo{
    height: 60px;
    background-color: #4998FC;
    text-align: center;
    img{
      height: 50px;
      width: auto;
      vertical-align: middle;
      margin-top: 5px;
    }
    span{
      vertical-align: middle;
      margin-left: 10px;
      color: #fff;
    }
  }
}
</style>
