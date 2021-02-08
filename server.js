const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

// 导入路由模块，user.js、profile.js
const users = require('./routers/api/users')
const profiles = require('./routers/api/profiles')

// DB config
const dbUrl = require("./config/dbUrl").dbUrl;
// 连接数据库
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
  console.log("数据库连接成功。。。")
}).catch(err=>{
  console.log(err)
})

// app.use(express.static('www'));
app.use(bodyParser.urlencoded({extended:true}));
// 初始化passport
app.use(passport.initialize());
// 配置passport
require("./config/passport")(passport);

// 将路由模块作为中间件使用
app.use("/api", users); // 注册接口：'/api/register'，登录接口：'/api/login'
app.use("/api/profiles", profiles); // profiles增删改查接口：'/api/profiles/add(delete,edit,list)'

app.listen(3001,()=>{
  console.log('服务启动，端口号3001...')
})