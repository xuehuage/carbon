import axios from 'axios';
import config from "@/assets/config/index"

// import {Message} from 'ant-design-vue';


// axios.defaults.baseURL = config.baseUrl;
// axios.defaults.headers['Content-Type'] ='application/x-www-form-urlencoded';
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
// axios.defaults.withCredentials = true;

axios.defaults.baseURL = config.baseUrl;
axios.defaults.headers['Content-Type'] ='application/json';
axios.defaults.withCredentials = true;

/**
 * 响应拦截器
 */
axios.interceptors.response.use(function(response) {
  
  return response.data;
    
},function(err){
   
    if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误';
            break
          case 401:
            err.message = '未授权，请登录';
            break
          case 403:
            err.message = '拒绝访问';
            break
          case 404:
            err.message = `请求地址出错: ${err.response.config.url}`;
            break
          case 408:
            err.message = '请求超时';
            break
          case 500:
            err.message = '服务器内部错误';
            break

          case 501:
            err.message = '服务未实现';
            break

          case 502:
            err.message = '网关错误';
            break

          case 503:
            err.message = '服务不可用';
            break

          case 504:
            err.message = '网关超时';
            break

          case 505:
            err.message = 'HTTP版本不受支持';
            break

          default:
        }
    }
    return Promise.reject(err)
})

export default axios;
