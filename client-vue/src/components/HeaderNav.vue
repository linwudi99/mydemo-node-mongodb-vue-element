<template>
  <div class="myHeaderNav">
    <el-avatar icon="el-icon-user-solid"></el-avatar>
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{userInfo.name}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="info">个人信息</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>    
  </div>
</template>

<script>
export default {
  name: 'headerNav',
  data() {
    return {
    };
  },
  computed:{
    userInfo(){
      return this.$store.getters.user;
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleCommand(command){
      if(command=='logout'){
        this.logout()
      }else{
        this.showInfo()
      }
    },
    logout(){
      // 清除token
      sessionStorage.removeItem('eleToken');
      this.$store.dispatch('clearState');
      this.$router.push('/login')
    },
    showInfo(){
      this.$router.push('/personalInfo')
    }
  },
};
</script>

<style lang="scss">
.myHeaderNav{
  width: 100%;
  height: 60px;
  background-color: #545C64;
  .el-avatar{
    float: right;
    margin: 10px;
  }
  .el-dropdown{
    float: right;
    margin-top: 22px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #FFF;
  }
  .el-icon-arrow-down {
    font-size: 16px;
  }
}
</style>