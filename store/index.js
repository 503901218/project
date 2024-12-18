import {
	defineStore
} from 'pinia'

export const counterStore = defineStore('counter', {
	state: () => ({
		userInfo: {
		avatar_url: null,
		birthday: null,
		biz_id: "",
		city: null,
		country: null,
		create_time: "",
		distributor_code: "",
		email: null,
		extend_qr_code: "",
		gender: 0,
		mobile: null,
		nickname: null,
		province: null,
		session_id: "",
		status: 1,
		},
		userId:'',
		sessionId: '',
		distributorCode: null, // 分享人随机码code 用于提交订单
		firstGoods: { //展示的商品
			"biz_id": "", //商品唯一值
			"goods_name": "2", //商品名
			"sale_price": 0, //售价
			"sales": 0, //销量
			"total_sales": 0, //销售总额
			"create_time": "", //创建时间
			"goods_img_url": "", //banner图
			"tags": [{
					"tag_name": "",
					"tag_details": ""
				}
			] //标签属性
		},
		addressList: [],
		defaultAddress: {
			address_code: null,
			address: "",
			biz_id: "null",
			city_name: null,
			customer_name: "",
			district_name: null,
			is_default: false,
			phone_no: "",
			province_name: null,
		}
	}),
	getters: {

	},
	actions: {
		getUserInfo(e) {

			this.userInfo = {
				...e
			}
		},
		getFirstGoods(e) {
			if (e) {
				this.firstGoods = {
					...e
				}

			}
		},
		getUserId(e){
			if (e) {
				this.userId = e
			
			}
		},
		getSessionId(e) {
			if (e) {
				this.sessionId = e

			}
		},
		setDistributorCode(e) {
			if (e) {
				this.distributorCode = e
		
			}
		},
		
		changge(e) {
			if (e) {
				this.defaultAddress = {
					...e
				}
			}
		},
		changeAddressList(e) {
			if (e) {
				this.addressList = e
			}


		}
	}
})