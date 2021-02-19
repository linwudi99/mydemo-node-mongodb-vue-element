<template>
  <div>
    <p>用户名：{{userInfo.name}}</p>
    <p>邮箱：{{userInfo.email}}</p>
    <p>角色权限：{{userInfo.roleId==1?'管理员':'普通用户'}}</p>
  </div>
</template>

<script>
export default {
  name: 'personalInfo',
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
  methods: {},
};
</script>

<style scoped>

</style>