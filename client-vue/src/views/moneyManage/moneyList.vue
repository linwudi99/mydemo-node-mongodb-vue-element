<template>
  <div>
    <el-form :model="formData" :inline="true">
      <el-form-item label="日期：">
        <el-date-picker v-model="formData.date" type="date" value-format="yyyy-MM-dd" :picker-options="expireTimeOption" placeholder="请选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleSearch">查询</el-button>
        <el-button type="success" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="table" border :data="tableData" style="width: 100%;height:700px;" >
      <el-table-column
        prop="date"
        label="日期"
        align="center"
        sortable>
      </el-table-column>
      <el-table-column
        v-for="c in columns"
        :prop="c.prop"
        :label="c.label"
        :width="c.width"
        :minWidth="c.minWidth"
        :key="c.prop"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">          
          <el-button type="warning" size="mini" @click="handleEdit(scope.row)" style="margin-right:10px">编辑</el-button>
          <el-popconfirm title="确定删除该条流水吗？"  icon-color="red" @confirm="handleDelete(scope.row)">
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popconfirm>                        
        </template>
      </el-table-column>
    </el-table>
    <add-edit-money :moneyObj="moneyObj" :detailForm="detailForm" @afterSave="getProfiles"></add-edit-money>
  </div>
</template>

<script>
import addEditMoney from './addEditMoney.vue'
export default {
  name: 'moneyList',
  components: {
    addEditMoney
  },
  data() {
    return {
      // 设置当日之后的日期不可选择
      expireTimeOption: {
				disabledDate(date) {
					return date.getTime() > Date.now();
				}
			},
      formData:{},
      tableData:[],
      columns:[
        // {
        //   prop:"date",
        //   label:"日期"
        // },
        {
          prop:"income",
          label:"收入（元）"
        },
        {
          prop:"expend",
          label:"支出（元）"
        },
        {
          prop:"surplus",
          label:"结余（元）"
        },
        {
          prop:"operator",
          label:"操作人"
        },
        {
          prop:"remark",
          label:"备注"
        },
      ],
      moneyObj:{},
      detailForm:{}
    };
  },
  mounted() {
    this.getProfiles()
  },
  computed:{
    name(){
      return this.$store.getters.user.name;
    }
  },
  methods: {
    getProfiles(){
      this.$axios.post("/api/profiles/list",this.formData).then(res=>{
        this.tableData = res.data.data
      }).catch(err=>{})
    },
    handleSearch(){
      this.getProfiles()
    },
    handleAdd(){
      this.moneyObj = {
        mode:'add',
        title: '新增',
        visible: true
      }
      this.detailForm = {
        date:'',       
        income: '',
        expend: '',
        surplus: '',
        operator:this.name,
        remark: '',
        id:''
      }
    },
    handleEdit(row){
      this.moneyObj = {
        mode:'edit',
        title: '编辑',
        visible: true,
      }
      this.detailForm = {
        date:row.date,       
        income: row.income,
        expend: row.expend,
        surplus: row.surplus,
        operator:row.operator,
        remark: row.remark,
        id: row._id,
      }
    },
    handleDelete(row){
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message.success("删除成功!");
        this.getProfiles();
      });
    },
    
  },
  watch: {
    'formData.date':{
      handler(val,newVal){
        if(val==null){
          this.formData = {}
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>