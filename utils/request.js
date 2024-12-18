// import { REQUEST_URL } from '../config/index.js'
import config from '../config/index.js'
var REQUEST_URL = config.REQUEST_URL
import {
	counterStore
} from '../store/index.js'

function apiRequest(opt, method = 'post') {
	opt.data = opt.data || {}
	opt.url = REQUEST_URL + opt.url
	opt.method = method;
	opt.header = opt.header || {
		"Content-Type": "application/json",
		'session-id': counterStore().sessionId
	}
	return new Promise((resolve, reject) => {
		opt.success = (res) => {
			if (Number(res.data.code) == 1) {
				resolve(res.data)
			} else {
				console.log(res)
				uni.showToast({
					title: res.data.message,
					icon: 'none',
					duration: 2000
				})
				reject('请求失败：' + res.data);
			}
		}
		opt.fail = (err) => {
			console.log(err)
			reject(err)
		}
		uni.request(opt)
	}).catch(err => {
		// uni.showToast({
		// 	title: err.message,
		// 	icon: 'none',
		// 	duration: 2000
		// })
		console.log(err)
	})
}

const request = {};

['post','get'].forEach((method) => {
	request[method] = (opt) => apiRequest(opt,method);
})


export default request;