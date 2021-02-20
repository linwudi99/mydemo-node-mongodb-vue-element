import axios from 'axios';
import {Message,Loading} from 'element-ui';

let loading;
function startLoading(){
  loading = Loading.service({
    lock: true,
    text:'数据加载中...',
    background: 'rgb(0,0,0,0.8)'
  });
}
function endLoading() {
  loading.close();
}

// 请求拦截  
axios.interceptors.request.use(config=>{
  startLoading();
  // 设置统一header
  if(sessionStorage.eleToken){
    config.headers.Authorization = sessionStorage.eleToken
  }
  return config;
},err=>{
  return Promise.reject(err)
})
// 响应拦截
axios.interceptors.response.use(res => {
  endLoading();
  return res;
}, err => {
  // 错误提醒
  endLoading();
  Message.error(err.response.data)
  // 401 token过期处理
  const status = err.response
  if(status==401){
    Message.error('token已过期，请重新登录')
    // 清除token，返回登录页面
    sessionStorage.removeItem('eleToken')
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios;