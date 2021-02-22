<template>
  <div class="register">
    <el-card>
      <p class="title">资金管理系统</p>
      <el-form label-width="80px" :model="formData" :rules="rules" ref="formData">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="roleId">
          <el-select v-model="formData.roleId" style="width:100%" placeholder="请选择角色权限">
            <el-option value="1" label="管理员"></el-option>
            <el-option value="0" label="普通用户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="formData.password2" placeholder="请再次输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button type="success" class="registerBtn" @click="registerHandle">注册</el-button>
          <p style="float:right">已有账号，去<router-link to='/login'>登录</router-link>。</p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    var validatePwd2 = (rule, value, callback) => {
      if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      formData:{
        name:'',
        email:'',
        roleId:'',
        password:'',
        password2:''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min:2, max:20, message: '长度在2~20个字符之间', trigger: 'blur' },
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        roleId: [
          { required: true, message: '角色权限不能为空', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePwd2, trigger: 'blur' }
        ],
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    registerHandle(){
      this.$refs['formData'].validate((valid) => {
          if (valid) {
            this.$axios.post("/api/users/register",this.formData).then(res=>{
              this.$message.success('注册成功！')
              this.$router.push('/login')
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    resetForm() {
      this.$refs['formData'].resetFields();
    }
  },
};
</script>

<style lang="scss">
.register{
  background-image: url('../assets/bg2.jpg');
  background-size: 100% 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-card{
    width:400px;
    background-color:cornsilk;
    opacity: 0.9;
    text-align: center;
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
  }
  .registerBtn{
    width: 100%;
  }
}
</style>