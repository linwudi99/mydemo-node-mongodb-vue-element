<template>
  <div class="myAsideMenu">
    <div class="logo">
      <img src="../assets/logo2.jpg" alt="">
      <span>资金管理</span>
    </div>    
    <el-menu background-color="#545c64" text-color="#fff" active-text-color="#4998FC" default-active="0">
      <router-link to="/container">
        <el-menu-item index="0">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <template v-for="item in menus">
          <!-- 有children的menu -->
          <el-submenu v-if="item.children && item.children.length>0" :key="item.path" :index="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.label}}</span>
            </template>
            <router-link v-for="i in item.children" :key="i.path" :to="i.path">
              <el-menu-item :index="i.path">
                <span slot="title">{{i.label}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
          <!-- 无children的menu -->
          <router-link v-else :to="item.path">
            <el-menu-item :index="item.path">
              <i :class="item.icon"></i>
              <span slot="title">{{item.label}}</span>
            </el-menu-item>
          </router-link>          
        </template>
      </router-link>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'asideMenu',
  data() {
    return {
      menus:[
        {
          icon:"el-icon-s-goods",
          label:"资金管理",
          path:"moneyManage",
          children:[
            {path:"moneyList",label:"资金流水"},
            {path:"moneyList2",label:"资金流水2"},
          ]
        },
        {
          icon:"el-icon-user-solid",
          label:"用户管理",
          path:"userManage",
          children:[
            {path:"userList",label:"用户信息"}
          ]
        },
        {
          icon:"el-icon-s-tools",
          label:"个人设置",
          path:"setting",
          children:[]
        },
      ]
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
