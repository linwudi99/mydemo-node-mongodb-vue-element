<template>
  <div class="login">
    <el-card>
      <p class="title">资金管理系统</p>
      <el-form :model="formData" :rules="rules" ref="formData">
        <el-form-item>
          <el-input v-model="formData.name" placeholder="请输入用户名">
            <el-button slot="prepend">
              <svg-icon icon-class="user" />
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.password" placeholder="请输入密码" type="password">
            <el-button slot="prepend">
              <svg-icon icon-class="password" />
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="formData.code" placeholder="请输入验证码">
          <el-button slot="prepend">
            <svg-icon icon-class="anquan" />
          </el-button>
          <template slot="append">
            <div class="login-code" @click="refreshCode">
            <identify-code :identifyCode="identifyCode"></identify-code>
            </div>
          </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" class="loginBtn" @click="loginHandle">登录</el-button>
          <p style="float:right">暂无账号，去<a @click="toRegister">注册</a>？</p>
        </el-form-item>
        <!-- <svg aria-hidden="true">
          <use xlink:href="#icon-user"></use>
        </svg> -->
      </el-form>
    </el-card>
  </div>
</template>

<script>
import IdentifyCode from './IdentifyCode';
export default {
  name: 'login',
  components: {
    IdentifyCode
  },
  data() {
    return {
      formData:{
        name:'',
        password:'',
      },
      rules: {},
      identifyCodes: '1234567890',
      identifyCode: '',
    };
  },
  created() {},
  mounted() {
    // 初始化验证码
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 重置验证码
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    loginHandle() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          if(this.formData.code == this.identifyCode){
            this.$axios.post("/api/login",this.formData).then(res=>{
              this.$message.success('登录成功！')
              this.$router.push('/home')
            })
          }else{
            this.$message.error('验证码输入错误！')
          }
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 去注册
    toRegister() {
      this.$router.push('./register')
    }
  },
};
</script>

<style lang="scss">
.login{
  background-image: url('../assets/bg.jpg');
  background-size: 100% 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-card{
    width:400px;
    background-color:cornsilk;
    opacity: 0.9;
    .title{
      margin-bottom: 15px;
      font-size: 22px;
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
    .el-input-group__append{
      padding: 0;
    }
    .login-code{
      cursor: pointer;
    }
  }
  .loginBtn{
    width: 100%;
  }
}
</style>