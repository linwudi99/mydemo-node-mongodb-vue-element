<template>
  <div>moneyList</div>
</template>

<script>
export default {
  name: 'moneyList',
  data() {
    return {
      formData:{},
      tableData:[]
    };
  },
  mounted() {
    this.getProfiles()
  },
  methods: {
    getProfiles(){
      this.$axios.post("/api/profiles/list",this.formData).then(res=>{
        console.log(res.data)
      }).catch(err=>{})
    }
  },
};
</script>

<style scoped>

</style>