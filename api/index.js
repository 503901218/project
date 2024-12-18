import request from '../utils/request.js'

var api = {}
// code换key
api.miniJscodeToSession = function(data) {
	return request.get({
		url: '/common/mini-jscode-to-session/',
		data
	})
}
// 保存用户信息
api.saveMiniUserInfo = function(data) {
	return request.post({
		url: '/common/save-mini-user-info/',
		data
	})
}
// 帮助中心问题列表
api.getHelpCenterList = function(data) {
	return request.get({
		url: '/common/get-help-center-list-api/',
		data
	})
}

// 奖励规则
api.getRewardRules = function(data) {
	return request.post({
		url: '/distribution/get-reward-rules-info/',
		data
	})
}

//提现规则
api.getVerificationRules = function(data) {
	return request.post({
		url: '/distribution/get-verification-rules-info/',
		data
	})
}

// 用户协议
api.getUserAgreementInfo = function(data) {
	return request.post({
		url: '/mall/get-user-agreement-info/',
		data
	})
}
//问题详情
api.getHelpCenterInfo = function(data) {
	return request.post({
		url: '/common/get-help-center-info-api/',
		data
	})
}
// 商品列表
// /mall/goods-list-api/
api.getGoodsList = function(data) {
	return request.get({
		url: '/mall/goods-list-api/',
		data
	})
}
// 首页商品详情
// http://127.0.0.1:8000/mall/get-goods-info-api/?biz_id=ae614452ed0249b3917e112e8b06a78c
api.getGoodsInfo = function(data) {
	return request.get({
		url: '/mall/get-goods-info-api/',
		data
	})
}

api.getPrivacyPolicy = function(data) {
	return request.post({
		url: '/mall/get-privacy-policy-info/',
		data
	})
}

// 获取用户地址
api.getCstomerAddress = function(data) {
	return request.get({
		url: '/mall/get-customer-address-api/',
		data
	})
}
// 编辑、增加地址
api.addCustomerAddress = function(data) {
	return request.post({
		url: '/mall/add-customer-address-api/',
		data
	})
}
// 删除地址

api.delCustomerAddress = function(data) {
	return request.post({
		url: '/mall/del-customer-address-api/',
		data
	})
}

// 创建订单
api.createGoodOrder = function(data) {
	return request.post({
		url: '/mall/create-good-order-api/',
		data
	})
}
// 订单详情
api.getOrderInfo = function(data) {
	return request.get({
		url: '/mall/get-order-info-api/',
		data
	})
}

// 订单列表
api.getOrderList = function(data) {
	return request.get({
		url: '/mall/my-order-list-api/',
		data
	})
}

// http://127.0.0.1:8000/mall/confirm-receipt-api/?order_id=4c35a845c0124244b9719431797c9b3b
// 订单列表
api.confirmReceipt = function(data) {
	return request.get({
		url: '/mall/confirm-receipt-api/',
		data
	})
}

// 奖励列表

api.getSubdivisionInformationList = function(data) {
	return request.get({
		url: '/distribution/get-subdivision-information-record-list/',
		data
	})
}
// 提现列表
// http://127.0.0.1:8000/distribution/get-verification-record-list/
api.getVerificationList = function(data) {
	return request.get({
		url: '/distribution/get-verification-record-list/',
		data
	})
}

// 开通实名
// http://127.0.0.1:8000/distribution/register-distributor-api/
api.registerDistributorApi = function(data) {
	return request.post({
		url: '/distribution/register-distributor-api/',
		data
	})
}

// 推广中心用户信息
api.getDistributorInfo = function(data) {
	return request.get({
		url: '/distribution/get-distributor-info/',
		data
	})
}
// 申请提现
api.applyVerification = function(data) {
	return request.post({
		url: '/distribution/apply-verification-api/',
		data
	})
}

// 获取支付参数
api.getWechatPayParams = function(data) {
	return request.post({
		url: '/mall/get-wechat-pay-params/',
		data
	})
}

// 获取分享海报
api.getDistributionPosterApi = function(data) {
	return request.post({
		url: '/mall/get-distribution-poster-api/',
		data
	})
}

export default api;