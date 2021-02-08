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
  return Promise.reject(err)
})

export default axios;