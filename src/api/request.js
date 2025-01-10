import config from "./config";
import axios from 'axios'
const request={}

const instance=axios.create({
    // baseURL:config.REQUEST_URL,
    timeout:60000//一分钟请求
})
// 请求拦截器
instance.interceptors.request.use(config => {
  config.headers = config.headers ||{
    'Content-Type':'application/json', //配置请求头
  }
  return config
}, error => {
  Promise.reject(error)
})
 
// 响应拦截
instance.interceptors.response.use(response => {
  //可以设置token过期时间
    const resCode = response.status;
    if (resCode === 200) {
      return  Promise.resolve(response);
    } else {
      return  Promise.reject(response);
    }
  }, error => {
    // console.log(error)
    // const resCode = error.response.status;
    // switch (resCode) {
    //   case 401:
        
    //     // alert('401,请求失败，请联系管理员')
    //     break;
    //   case 404:
    //     // alert('404,网络请求不存在')
    //     break;
    //   case 500:
    //     // alert('500,服务器连接错误')
      
    //     break;
    //   // 其他状态码错误提示
    //   default:
    //     // alert(resCode,',请求失败，请联系管理员')
    // }
    // return Promise.reject(error);
  })

request.requestData=(wey, url,params)=>{
  return new Promise((resolve,reject)=>{
      instance[wey](url,params).then(res=>{
        console.log('requestData',res)
        resolve(res.data)

          // resolve(res.data)
      }).catch(err=>{
          reject(err)
      })
  })    
}
// ['post','get'].forEach(i=>{
//     request[i]=(opt)=>request.requestData[i](opt)
// })

let requestData=request.requestData
export  {requestData};
export default request
