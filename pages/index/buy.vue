<template>
	<page-meta :page-style="'overflow:'+(showPrivacyInfo||showTipInfo?'hidden':'visible')">
		<view class="content col ai-c">
			<navs :tit="title"></navs>

			<view class="buy-box ">

				<view class="buy-box-add-1 " :class="this.info.delivery_method ==2?'choose-btn1':'choose-btn2'">
					<view class="tit-bg  tit-1">
						<image @click="chooseType(1)" src="../../static/index/buy/btn1.png" mode=""></image>
					</view>
					<view class="tit-bg  tit-2">
						<image @click="chooseType(2)" src="../../static/index/buy/btn2.png" mode=""></image>
					</view>
					<view class="tit row ai-c jc-sb">
						<view class="tit-l" @click="chooseType(1)">
							包邮到家
						</view>
						<view class="tit-r" @click="chooseType(2)">
							上门自取
						</view>
					</view>
				</view>
				<view class="buy-address row jc-sb ai-c" @click="goAddressList()">
					<view class="buy-address-l row ">
						<image v-if="addressObj.address!=''" src="../../static/index/buy/address.png" mode=""></image>
						<image v-else src="../../static/index/buy/address2.png" mode=""></image>

						<view class="buy-address-l-txt">
							<span v-if="addressObj.address!=''">
								{{addressObj.province_name}}{{addressObj.city_name}}{{addressObj.district_name}}
								{{addressObj.address.replace(addressObj.province_name+addressObj.city_name+addressObj.district_name, "")}}
							</span>
							<span v-else class="noadd">请设置收货地址</span>
						</view>

					</view>
					<view class="buy-address-r" v-show="info.delivery_method==1">
						<image src="../../static/index/buy/more.png" mode=""></image>
					</view>
				</view>
				<view class="buy-address-guest row">
					<view class="buy-address-guest-name">
						{{addressObj.customer_name}}

					</view>
					<view class="buy-address-guest-phone">

						{{addressObj.phone_no}}

					</view>
				</view>
			</view>
			<view class="buy-box goods-box">
				<view class="goods">
					<view class="goods-info row jc-sb">
						<view class="goods-info-pic">
							<image :src="IMG_URL+goodsInfo.imgs[0].thumb_url" mode=""></image>
						</view>
						<view class="goods-info-tit col jc-sb">
							<view class="goods-info-tit-txt">
								{{goodsInfo.goods_name}}
							</view>
							<view class="goods-info-tit-price row jc-sb ">
								<view class="goods-info-tit-price-l row ">
									实付￥
									<view class="goods-info-tit-price-l-big">
										{{goodsInfo.sale_price*info.good_dic.qty}}
									</view>
								</view>
								<view class="goods-info-tit-price-r row jc-c ai-c">
									<view class="goods-info-tit-price-r-pic" @click="getNum(-1)">
										<image src="../../static/index/buy/sub.png" mode=""></image>
									</view>
									<view class="goods-info-tit-price-r-txt">
										{{info.good_dic.qty}}
									</view>
									<view class="goods-info-tit-price-r-pic" @click="getNum(1)">
										<image src="../../static/index/buy/add.png" mode=""></image>
									</view>
								</view>

							</view>

						</view>

					</view>
				</view>

				<view class="line">

				</view>
				<view class="des">
					规格描述
				</view>
				<view class="des-list row">
					<view class="des-item" v-for="i,index in goodsInfo.tags" :key="index">
						{{i.tag_details}}
					</view>
				</view>
			</view>
			<view class="buy-box pay-box">
				<view class="pay-box-way row jc-sb ai-c" @click="chooseWx()">
					<view class="pay-box-way-l  row  ai-c">
						<image src="../../static/index/buy/pay.png" mode=""></image>
						微信支付
					</view>
					<view class="pay-box-way-r   row  f-c" :class="chooseWxVtn?'choose-pay':''">
						<image src="../../static/index/buy/choose.png" mode=""></image>
					</view>
				</view>
				<view class="line">

				</view>
				<view class="pay-btn row f-c canpay" @click="order()">
					<view class="pay-btn-s">
						立即支付￥
					</view>
					<view class="pay-btn-m">
						{{goodsInfo.sale_price*info.good_dic.qty}}
					</view>
				</view>
				<view class="tips-box row f-c" @click="chooseTip()">
					<view class="tips-box-btn " :class="chooseAgree?'choose-agree':''">
						<image src="../../static/index/buy/choose.png" mode=""></image>
					</view>
					<view class="tips-box-agree">
						我已阅读并同意
					</view>
					<view>
						<span @click.stop="showTipInfo=true" class="tips-box-word">《用户服务协议》</span> 、 <span
							@click.stop="showPrivacyInfo=true" class="tips-box-word">《隐私政策》</span>
					</view>
				</view>

			</view>

			<view class="tips-bg col ai-c" v-show="showPrivacyInfo||showTipInfo">

				<view class="tips-bg-info">
					<scroll-view  class="" style="width: 100%;height: 100%;" scroll-y="true"
						:show-scrollbar='false' :scroll-top="tipsGoTop">

						<view class="tips-bg-info-tit">
							{{showPrivacyInfo?'隐私政策':'用户服务协议'}}

						</view>
						<view class="tips-bg-info-det">
							<mp-html v-show="showPrivacyInfo" :content="privacyPolicyInfo" />
							<mp-html v-show="showTipInfo" :content="goodsDesInfo" />

						</view>
					</scroll-view>
				</view>

				<view class="close-btn" @click="closeTip()">

					<image src="../../static/center/close.png" mode=""></image>
				</view>
			</view>

		</view>


	</page-meta>
</template>

<script>
	import config from '../../config/index.js'
	import navs from '../../component/nav.vue'
	export default {

		data() {
			return {
				storeObj: null,
				startAddressObj: {

				},
				addressObj: { //地址
					address_code: null,
					address: "",
					biz_id: "null",
					city_name: null,
					customer_name: "",
					district_name: null,
					is_default: false,
					phone_no: "",
					province_name: null,
				},
				IMG_URL: config.IMG_URL,
				chooseWxVtn: true, //勾选微信支付
				showPrivacyInfo: false, //展示隐私协议
				showTipInfo: false, //展示安全
				chooseAgree: false, //同意协议

				privacyPolicyInfo: '', //隐私
				goodsDesInfo: '', //协议
				goodsId: '',
				// showTips: false,
				title: '确认订单',
				selfGetAddressInfo: {
					address_code: null,
					address: "",
					biz_id: "null",
					city_name: null,
					customer_name: "",
					district_name: null,
					is_default: false,
					phone_no: "",
					province_name: null,
				},
				goodsInfo: {
					goods_name: '',
					sale_price: 0,
					imgs: [{
						thumb_url: ''
					}],
					tags: [{
						idx: 0,
						tag_details: '',
						tag_name: ''
					}],
					content: '<div>Hello World!</div>',
				},
				info: {
					"delivery_method": 1, //1=快递包邮 2=上门自取
					"address_id": "", //地址id
					// "distributor_biz_id": "b53fdfb91209471ebc1d656bf347bda2", //二维码进来才有，推广员id
					"distributor_code": this.$store.distributorCode, //二维码进来才有，推广员code
					"good_dic": {
						"qty": 1, //商品数量
						"biz_id": "" //商品id} //商品信息
					},

				},
				commiting: false, //判断是否提交订单
				tipsGoTop: 0, //协议返回顶部
			}
		},
		components: {
			navs,

		},
		inject: ['login'],
		onLoad(e) {
			if (e.id) {
				this.goodsId = e.id
				this.info.good_dic.biz_id = e.id
			}
			if (e.addressObj) {
				this.startAddressObj = JSON.parse(decodeURIComponent(e.addressObj))
				this.addressObj = JSON.parse(decodeURIComponent(e.addressObj))
			} else if (this.$store.defaultAddress.address.length > 0) {
				this.addressObj = this.$store.defaultAddress
				this.startAddressObj = this.$store.defaultAddress
			}

		},
		watch: {
			'showPrivacyInfo': {
				handler(newvel, old) {
					if (newvel) {
						this.tipsGoTop = 0.1
					} else {
						this.tipsGoTop = 0
					}

				}
			},
			'showTipInfo': {
				handler(newvel, old) {
					if (newvel) {
						this.tipsGoTop = 0.1
					} else {
						this.tipsGoTop = 0
					}

				}
			},
		},
		mounted() {
			var that = this
			this.login().then((res) => {
				that.getData()
			});
		},
		methods: {
			
			goAddressList() {
				if (this.info.delivery_method == 2) {
					return
				}
				uni.navigateTo({
					url: './address?goodsId=' + this.goodsId
				})
			},

			closeTip() {

				this.showPrivacyInfo = false
				this.showTipInfo = false

			},
			chooseTip() {
				this.chooseAgree = !this.chooseAgree
			},
			chooseWx() {
				this.chooseWxVtn = !this.chooseWxVtn

			},
			getAddress(e) {
				var that = this
				this.$api.getCstomerAddress(e == 2 ? {
					'is_pick_up': 1
				} : null).then(res => {

					if (res.code) {
						if (e == 2) {
							that.addressObj = {
								...res.data[0]
							}
							that.selfGetAddressInfo = {
								...res.data[0]
							}
						} else {
							that.$store.changeAddressList(res.data)
							for (let i = 0; i < res.data.length; i++) {

								if (res.data[i].is_default) {
									that.$store.changge(res.data[i])
									break
								}
								if (i == res.data.length - 1) {
									//没有默认，就展示列表第一个
									that.$store.changge(res.data[0])

								}
							}
							that.addressObj = that.$store.defaultAddress
							that.startAddressObj = that.$store.defaultAddress
						}
					}

				})
			},
			getData() {
				var that = this
				
				if (this.addressObj.address == "") {
					this.getAddress(1)
				}
				if (this.goodsId) {
					this.$api.getGoodsInfo({
						'biz_id': this.goodsId
					}).then(res => {
						if (res.code) {
							that.goodsInfo = res.data
						}
						that.$forceUpdate()
					})
					this.$api.getUserAgreementInfo().then(res => {
						if (res.code) {
							that.goodsDesInfo = res.data
						}
					})
					this.$api.getPrivacyPolicy().then(res => {
						that.privacyPolicyInfo = res.data
					})
				}
			},
			getNum(i) {
				this.info.good_dic.qty += i
				if (this.info.good_dic.qty < 0) {
					this.info.good_dic.qty = 0
					return
				}
			},
			// 快递方式
			chooseType(i) {
				this.info.delivery_method = i
				if (i == 2) {
					if (this.selfGetAddressInfo.address != "") {
						this.addressObj = this.selfGetAddressInfo
					} else {
						this.getAddress(2)
					}
				} else {
					this.addressObj = this.startAddressObj
				}
			},

			order() {
				var that = this
				if (!this.chooseAgree) {
					uni.showToast({
						title: '请勾选同意协议',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (!this.chooseWxVtn) {
					uni.showToast({
						title: '请选择微信支付',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (this.info.good_dic.qty == 0) {
					uni.showToast({
						title: '购买数量不能少于1件',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (this.commiting) {
					return
				}
				this.commiting = true

				this.info.address_id = this.addressObj.biz_id
				this.$api.createGoodOrder(this.info).then(res => {
					that.commiting = false
					if (res.code) {
						this.$api.getWechatPayParams({
							order_id: res.data.order_id
						}).then(resp => {
							wx.requestPayment({
								timeStamp: resp.data.timeStamp,
								nonceStr: resp.data.nonceStr,
								package: resp.data.package,
								signType: resp.data.signType,
								paySign: resp.data.paySign,
								success: (respo) => {
									if (respo.errMsg && respo.errMsg === "requestPayment:ok") {

										uni.showToast({
											title: '成功',
											icon: 'none',
											duration: 2000,
											complete: () => {
												uni.redirectTo({
													url: '/pages/center/order-d?id=' +
														res.data.order_id
												})
											}
										})
									} else {

										uni.showToast({
											title: '支付成功',
											icon: 'none',
											duration: 2000,
											complete: () => {
												uni.redirectTo({
													url: '/pages/center/order-d?id=' +
														res.data.order_id
												})
											}
										})
									}

								},
								fail: (error) => {

									uni.showToast({
										title: '支付失败',
										icon: 'none',
										duration: 2000,
									})
								}
							})
						}).catch(err => {
							console.log(err)
						})

					}
				})

			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		background-color: $uni-bg-color;

		min-height: 100vh;
		padding: 0 22rpx;
		box-sizing: border-box;
		color: rgba(58, 58, 58, 1);

		.line {
			width: 100%;
			height: 1px;
			background-color: rgba(244, 244, 244, 1);
		}

		.buy-box {
			margin-top: 22rpx;
			width: 100%;
			background-color: #fff;
			border-radius: 20rpx;
			overflow: hidden;
			font-size: 32rpx;


			.choose-btn1 {
				.tit {
					.tit-l {
						color: rgba(58, 58, 58, .7);
					}

				}

				position: relative;

				image {
					position: absolute;
					left: 0;
				}

				.tit-2 {
					display: none;
				}
			}

			.choose-btn2 {
				.tit-1 {
					display: none;
				}

				.tit {
					.tit-r {
						color: rgba(58, 58, 58, .7);
					}
				}

				position: relative;

				image {
					position: absolute;
					right: 0;
				}
			}

			.buy-box-add-1 {
				position: relative;
				// 	width: 100%;
				height: 96rpx;

				.tit-bg {
					width: 100%;
					height: 96rpx;
					position: absolute;
					left: 0;
					top: 0;

					image {
						width: 416rpx;
						height: 96rpx;
					}
				}

				.tit {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;

					// padding: 0 122rpx;
					view {
						width: 50%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}


			}

			.buy-address {
				width: 100%;
				padding: 0 22rpx;
				box-sizing: border-box;
				margin-top: 30rpx;

				.buy-address-l {


					.buy-address-l-txt {
						font-size: 34rpx;
						line-height: 50rpx;
						white-space: wrap;
						font-weight: 500;
						width: 476rpx;

						.noadd {
							color: rgba(237, 111, 106, 1);
						}
					}

					image {
						margin-top: 8rpx;
						width: 30rpx;
						height: 36rpx;
						margin-right: 16rpx;
					}
				}

				.buy-address-r {
					image {
						width: 24rpx;
						height: 24rpx;
					}
				}
			}

			.buy-address-guest {
				padding: 0 22rpx 32rpx;
				box-sizing: border-box;
				width: 100%;
				margin-top: 12rpx;
				color: rgba(163, 166, 164, 1);
				font-size: 24rpx;

				.buy-address-guest-name {
					margin-right: 20rpx;
				}
			}
		}

		.goods-box {
			width: 100%;
			padding: 32rpx 22rpx;
			box-sizing: border-box;

			.goods {


				.goods-info {
					.goods-info-pic {
						border-radius: 20rpx;
						overflow: hidden;
						margin-right: 22rpx;
						width: 158rpx;
						height: 158rpx;

					}
				}

				.goods-info-tit {
					font-size: 26rpx;
					font-weight: 500;

					.goods-info-tit-txt {
						font-weight: 500;
						width: 480rpx;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;

					}

					.goods-info-tit-price {
						.goods-info-tit-price-l {
							align-items: baseline;
							color: rgba(171, 151, 132, 1);

							.goods-info-tit-price-l-big {
								font-size: 48rpx;
							}
						}
					}

					.goods-info-tit-price-r {
						.goods-info-tit-price-r-pic {
							width: 38rpx;
							height: 38rpx;
						}

						.goods-info-tit-price-r-txt {
							margin: 0 28rpx;
						}
					}
				}
			}

			.line {
				margin: 34rpx 0 24rpx 0;

			}

			.des {
				margin-bottom: 24rpx;
				font-size: 32rpx;

			}

			/* 隐藏水平滚动条 */
			.des-list::-webkit-scrollbar {
				height: 0;
			}

			.des-list {
				width: 100%;
				overflow: scroll;

				.des-item {
					white-space: nowrap;
					border-radius: 20rpx;
					margin-right: 18rpx;
					padding: 14rpx 24rpx;
					color: rgba(171, 151, 132, 1);
					font-size: 26rpx;
					background-color: rgba(171, 151, 132, 0.10);
				}
			}
		}

		.pay-box {
			width: 100%;
			padding: 32rpx 22rpx;
			box-sizing: border-box;

			.pay-box-way {
				.pay-box-way-l {
					image {
						width: 36rpx;
						height: 36rpx;
						margin-right: 16rpx;
					}

					font-size: 26rpx;
				}

				.pay-box-way-r {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 1px solid rgba(171, 151, 132, 1);

					image {
						display: none;
					}
				}

				.choose-pay {

					border: 0px solid rgba(171, 151, 132, 1);

					image {
						display: block;
						width: 40rpx;
						height: 40rpx;
					}
				}




			}

			.line {
				margin: 34rpx 0 32rpx 0;

			}

			.pay-btn {
				margin: 0 auto;
				width: 318*2rpx;
				border: 1px solid #efdac6;
				height: 78rpx;
				border-radius: 40rpx;
				font-weight: 600;

				.pay-btn-s {
					font-size: 26rpx;
				}

				.pay-btn-m {
					height: 76rpx;
					font-size: 48rpx;
				}
			}

			.canpay {
				background-color: #efdac6;
			}

			.tips-box {
				width: 100%;
				margin-top: 32rpx;
				font-size: 20rpx;
				color: rgba(163, 166, 164, 1);

				.tips-box-btn {
					width: 21rpx;
					height: 21rpx;
					margin-right:9rpx;
					border-radius: 50%;
					border: 1px solid rgba(171, 151, 132, 1);

					image {
						display: none;
					}
				}

				.choose-agree {

					border: 0px solid rgba(171, 151, 132, 1);

					image {
						display: block;
						width: 20rpx;
						height: 20rpx;
					}
				}

				.tips-box-word {
					text-decoration: underline;
					color: rgba(171, 151, 132, 1);
				}
			}
		}

		.tips-bg {
			z-index: 1111;
			width: 100vw;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.30);

			.close-btn {
				margin-top: 44rpx;
				height: 80rpx;
				width: 80rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			/* 隐藏水平滚动条 */
			.tips-bg-info::-webkit-scrollbar {
				height: 0;
				width: 0;


			}

			scroll-view {

				::-webkit-scrollbar {
					display: none;
					width: 0 !important;
					height: 0 !important;
					-webkit-appearance: none;
					background: transparent;
				}

			}

			.tips-bg-info {
				height: 1092rpx;
				overflow: scroll;
				width: 600rpx;
				margin-top: 266rpx;
				background-color: #fff;
				border-radius: 40rpx;
				padding: 46rpx;
				box-sizing: border-box;

				.tips-bg-info-tit {
					text-align: center;
					font-size: 28rpx;
				}

				.tips-bg-info-det {
					margin-bottom: 34rpx;
					font-size: 22rpx;
					line-height: 40rpx;

					.tips-bg-info-det-tit {
						margin-top: 28rpx;
					}
				}

				.tips-bg-info-btn {
					width: 510rpx;
					font-size: 28rpx;
					height: 76rpx;
					border-radius: 40rpx;
				}

				.tips-bg-info-btn-y {

					background-color: #efdac6;
				}

				.tips-bg-info-btn-n {
					color: rgba(163, 166, 164, 1);
				}
			}
		}
	}
</style>