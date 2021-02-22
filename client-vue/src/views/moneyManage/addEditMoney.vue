<template>
  <div>
    <el-dialog width="500px" :title="moneyObj.title" :visible.sync="moneyObj.visible" :close-on-click-modal="false">
      <el-form label-width="60px" :model="detailForm" :rules="rules" ref="detailForm">
        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="detailForm.date" type="date" value-format="yyyy-MM-dd" :picker-options="expireTimeOption" placeholder="请选择日期" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="收入" prop="income">
          <el-input-number v-model="detailForm.income" :min="0" :precision="2" placeholder="请输入" style="width:100%"></el-input-number>
        </el-form-item>
        <el-form-item label="支出" prop="expend">
          <el-input-number v-model="detailForm.expend" :min="0" :precision="2" placeholder="请输入" style="width:100%"></el-input-number>
        </el-form-item>
        <el-form-item label="结余" prop="surplus">
          <el-input-number disabled v-model="detailForm.surplus" :precision="2" style="width:100%"></el-input-number>
        </el-form-item>
        <!-- <el-form-item label="操作人" prop="operator">
          <el-input v-model="detailForm.operator"></el-input>
        </el-form-item> -->
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="detailForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSure">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addEditMoney',
  props:{
    moneyObj:Object,
    detailForm:Object
  },
  data() {
    return {
      // 设置当日之后的日期不可选择
      expireTimeOption: {
				disabledDate(date) {
					return date.getTime() > Date.now();
				}
			},
      rules:{
        date: [
          { required: true, message: '日期不能为空', trigger: 'blur' }
        ],
        income: [
          { required: true, message: '收入不能为空', trigger: 'blur' }
        ],
        expend: [
          { required: true, message: '支出不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {   
  },
  
  methods: {    
    handleClose(){
      this.moneyObj.visible = false
    },
    handleSure(){
      this.$refs['detailForm'].validate((valid) => {
        if (valid) {
          let url = this.moneyObj.mode == 'add' ? '/api/profiles/add' : `/api/profiles/edit/${this.detailForm.id}`
          this.$axios.post(url,this.detailForm).then(res=>{
            this.$emit('afterSave')
            this.handleClose()
            this.$message.success(`${this.moneyObj.title}成功！`)
          })
        }
      });      
    },
    // 浮点数相减
    accSub(arg1, arg2) {
      if (isNaN(arg1)) {
          arg1 = 0;
      }
      if (isNaN(arg2)) {
          arg2 = 0;
      }
      arg1 = Number(arg1);
      arg2 = Number(arg2);

      var r1, r2, m, n;
      try {
          r1 = arg1.toString().split(".")[1].length;
      }
      catch (e) {
          r1 = 0;
      }
      try {
          r2 = arg2.toString().split(".")[1].length;
      }
      catch (e) {
          r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
      n = (r1 >= r2) ? r1 : r2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }
  },
  watch:{
    'detailForm.income':{
      handler(val,newVal){
        this.detailForm.surplus = this.accSub(this.detailForm.income,this.detailForm.expend)
      }
    },
    'detailForm.expend':{
      handler(val,newVal){
        this.detailForm.surplus = this.accSub(this.detailForm.income,this.detailForm.expend)
      }
    }
  }
};
</script>

<style scoped>

</style>