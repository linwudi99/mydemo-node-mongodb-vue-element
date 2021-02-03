# 后端服务
1、npm i nodemon -g 并配置package.json中，"server":"nodemon server.js"  
热启动服务：npm run server

2、npm i mongoose express body-parser

3、npm i bcrypt  用于密码的加密解密

4、npm i jsonwebtoken  用于登录成功生成token

5、npm i passport passport-jwt  用于验证token

# 前端项目
client-vue是前端项目文件夹
npm run serve / yarn serve 启动前端项目

# 前后端同时启动
1、npm i concurrently  用于后端和前端连载，配置同时启动

2、外层package.json文件中配置如下：
"scripts": {
  "client-vue-install": "npm install --prefix client-vue", // 启动时install前端依赖
  "client":"npm run serve --prefix client-vue", // 启动前端项目
  "start": "node server.js",
  "server": "nodemon server.js", // 热重载启动后端服务
  "dev": "concurrently \"npm run server\" \"npm run client\""
},

3、npm run dev 同时启动前后端
