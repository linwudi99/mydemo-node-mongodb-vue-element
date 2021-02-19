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

// app.use(express.static('client-vue'));
// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 连接数据库
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
  console.log("数据库连接成功。。。")
}).catch(err=>{
  console.log("数据库连接失败！")
})

// 初始化passport
app.use(passport.initialize());
// 配置passport
require("./config/passport")(passport);

// 将路由模块作为中间件使用
app.use("/api/users", users); // 注册接口：'/api/users/register'，登录接口：'/api/users/login'
app.use("/api/profiles", profiles); // profiles增删改查接口：'/api/profiles/add(delete,edit,list)'

const port = process.env.PORT || 3001;

app.listen(port,()=>{
  console.log(`服务启动，端口号${port}...`)
})