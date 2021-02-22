const mongoose = require("mongoose");

// 设置数据模式并创建数据模型类
const profileSchema = mongoose.Schema({  
  // 收入
  income: {
    type: String,
  },
  // 支出
  expend: {
    type: String,
  },
  // 结余
  surplus: {
    type: String,
  },
  // 操作人
  operator: {
    type: String,
  },
  // 备注
  remark: {
    type: String,
  },
  // 日期
  date: {
    type: String,
  },
})

module.exports = Profile = mongoose.model('profiles', profileSchema)