import request from "./request";
import {requestData} from './request'
const api={}

// 获取index左侧数据
// api.getLeftList = params => request.getRequest(`client/get-creation-list-api/`, params)
api.getLeftList = params =>requestData('get',`/qiling/home-page/`, params)
let getLeftList = params =>requestData('get',`/qiling/home-page/`, params)


api.getTest = params =>requestData('get',`http://127.0.0.1:8081/process_get/`+params)


export {getLeftList}
export default api
