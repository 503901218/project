<template>
	<view class="content col ai-c">
		<!-- <view class="top-box"> -->
		<navs :tit="title"></navs>

		<view class="btn-menu row  jc-sb">
			<view class="btn-menu-item  col f-c" :class="order_state==null?'btn-menu-item-choose':''"
				@click="changeTap(null)">
				全部
				<view class=" btn-menu-item-line">

				</view>
			</view>
			<view class="btn-menu-item col f-c " :class="order_state==2?'btn-menu-item-choose':''"
				@click="changeTap(2)">
				已支付
				<view class=" btn-menu-item-line">

				</view>
			</view>
			<view class="btn-menu-item col f-c " :class="order_state==5?'btn-menu-item-choose':''"
				@click="changeTap(5)">
				已发货
				<view class=" btn-menu-item-line">

				</view>
			</view>
			<view class="btn-menu-item col f-c" :class="order_state==4?'btn-menu-item-choose':''" @click="changeTap(4)">
				已完成
				<view class=" btn-menu-item-line">

				</view>
			</view>
		</view>
		<!-- </view> -->
		<view class="empty col f-c" v-show="listData.length==0">
			<view class="empty-pic col f-c">
				<image src="../../static/center/empty.png" mode="widthFix" />
				<view class="empty-txt">
					暂无订单
				</view>
			</view>

		</view>
		<scroll-view class="order-list col ai-c" scroll-y="true" lower-threshold=50
			@scrolltolower="scrolltolowerFun($event)">
			<view class="order-item" @click="getDetailss(item)" v-for="item,index in listData" :key="index">
				<view class="order-item-tit row ai-c jc-sb">
					<view class="order-item-tit-l">
						订单编号：{{item.order_no}}
						<!--  -->
					</view>
					<view class="order-item-tit-r">
						<!-- 1是待支付、2是已支付、3是已取消、4是已完成、5是已发货 -->
						{{item.order_state==1?'待支付':''}}
						{{item.order_state==2?'已支付':''}}
						{{item.order_state==3?'已取消':''}}
						{{item.order_state==4?'已完成':''}}
						{{item.order_state==5?'已发货':''}}
						<!-- 	{{item.order_state==2?'已支付':item.order_state==4?'已完成':''}} -->
					</view>
				</view>
				<view class="line"></view>
				<view class="goods-info row ">
					<block v-if="item.goods[0].goods_img_url">
						<image :src="IMG_URL+item.goods[0].goods_img_url" class="goods-info-pic" />
					</block>
					<view class="goods-info-detail">
						<view class="goods-info-detail-tit">
							{{item.goods[0]?item.goods[0].good_name:''}}
						</view>
						<view class="goods-info-detail-tag row">
							<view class="goods-info-detail-tag-item">
								{{item.delivery_method==1?'快递包邮':'上门自取'}}
							</view>
						</view>
						<view class="goods-info-detail-price row ai-c jc-sb">
							￥{{item.goods[0]?item.goods[0].unit_price:0}}
							<view class="">
								X{{item.goods[0]?item.goods[0].qty:0}}
							</view>
						</view>
					</view>
				</view>
				<view class="line">

				</view>
				<view class="pay-box row ai-c jc-sb">
					<view class="pay-box-l row ai-c">
						<view class="pay-box-l-word">
							实付款：
						</view>
						￥
						<view class="pay-box-l-price">
							{{item.payment_fee}}
						</view>
					</view>
					<view class="pay-box-r row f-c" @click.stop="receipt(item)" v-show="item.order_state==5">
						确认收货
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	var plugin = requirePlugin("logisticsPlugin")
	import config from '../../config/index.js'
	import navs from '../../component/nav.vue'
	export default {
		data() {
			return {
				IMG_URL: config.IMG_URL,
				title: '订单列表',
				// chooseTap: 0,//0完成2已经支付4已经完成
				listPage: 1,
				listLoading: false,
				limit: 10,
				listAll: 0,
				listData: [{
					"biz_id": "",
					"order_state": 2, //订单状态,1=等待支付 2=支付成功 3=订单取消 4=订单完成
					"order_no": "", //订单号
					"delivery_method": 0, //1=快递包邮 2=上门自取
					"payment_fee": 0, //实付金额
					"create_time": "", //下单时间
					"goods": [{
							"good_name": "",
							"goods_img_url": "11",
							"unit_price": 0, //单价
							"qty": 0 //数量
						},

					] //商品
				}, ], //全部订单
				paidList: [], //已支付订单
				finishLish: [], //已完成订单
				order_state: null, //不传为全部,1=等待支付 2=支付成功 3=订单取消 4=订单完成
			}
		},
		inject: ['login'],
		components: {
			navs,
		},
		onLoad(e) {
			var that = this

			this.login().then((res) => {
				that.initRefresh()
			});
			console.log('order')
		},

		mounted() {},
		onShow() {
			console.log('show')
		},
		// 监听下拉更新 （重新获取第一页信息）
		onPullDownRefresh() {
			this.initRefresh()
		},
		methods: {
			scrolltolowerFun(e) {

				//加载中就不进行加载
				if (this.listLoading) {
					return
				} else {

					//加载下一页	
					this.receivedLetter() //第一次的时候listPage=1
					this.listPage++
				}
			},
			getDetailss(item) {

				uni.navigateTo({
					url: './order-d?id=' + item.biz_id
				})
			},
			initRefresh() {
				//初始化信息
				this.listPage = 1
				this.listLoading = false
				this.listData = []
				this.listAll = 0
				this.receivedLetter()
			},
			receipt(item) {
				var that = this
				const {
					biz_id,
					transaction_id
				} = item
				if (wx.openBusinessView) {
					wx.openBusinessView({
						businessType: 'weappOrderConfirm',
						extraData: {
							transaction_id
						},
						success(resp) {
							that.$api.confirmReceipt({
								order_id: biz_id
							}).then(res => {
								if (res.code) {
									uni.showToast({
										title: '确认成功',
										icon: 'none',
										duration: 2000
									})
									that.changeTap(that.order_state)
								}
							})
						},
						fail(err) {
							uni.showToast({
								title: '确认收货失败',
								icon: 'none',
								duration: 2000
							})
						}
					});
				} else {
					//引导用户升级微信版本
					console.log("wx.openBusinessView 未找到")
					uni.showToast({
						title: '确认收货失败',
						icon: 'none',
						duration: 2000
					})
				}
			},

			receivedLetter() {

				// 停止刷新请求条件
				if (this.listData && this.listData.length !== 0 && this.listData.length >= this.listAll) {
					uni.stopPullDownRefresh()
					return
				}

				this.listLoading = true //开始请求
				let obj = {}
				if (this.order_state != null) {
					obj.order_state = this.order_state
					obj.page = this.listPage //重点是这个会变的请求页码
					obj.limit = 10
				}
				this.$api.getOrderList(obj).then(res => {
					this.listLoading = false //请求完成
					this.listData.push(...res.data) //追加数据
					this.listAll = res.recordsTotal

					this.$forceUpdate()
					uni.stopPullDownRefresh() //停止刷新

				})
			},

			changeTap(i) {
				if (i != 0) {
					this.order_state = i
				} else {
					this.order_state = null
				}
				this.initRefresh()
			},
			viewLogistics(waybill_token) {
				plugin.openWaybillTracking({
					waybillToken: waybill_token
				});
			},
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		min-height: 100vh;
		color: #3A3A3A;
		background-color: $uni-bg-color;

		.top-box {
			position: fixed;
			top: 0;
			width: 100%;
			height: fit-content;
		}

		.empty {
			width: 100%;
			padding: 0 74rpx;
			box-sizing: border-box;
			padding-top: 330rpx;

			.empty-pic {
				width: 602rpx;
				height: 602rpx;
				position: relative;

				image {
					width: 75%;
					height: auto;
				}

				.empty-txt {
					font-size: 26rpx;
					color: #A3A6A4;
					width: 100%;
					text-align: center;
					position: absolute;
					bottom: 55rpx;
					line-height: 38rpx;
				}
			}

			.empty-btn {
				width: 197*2rpx;
				height: 76rpx;
				background-color: #efdac6;
				border-radius: 40rpx;
				font-size: 28rpx;
			}
		}

		// page{
		//       padding-bottom: constant(safe-area-inset-bottom);兼容 iOS < 11.2 
		//       padding-bottom: env(safe-area-inset-bottom); 兼容 iOS >= 11.2 
		//     }

		.order-list {
			width: 100%;
			max-height: calc(100vh - 286rpx - env(safe-area-inset-bottom));
			overflow: scroll;
			// box-sizing: border-box;
			// padding-bottom:  env(safe-area-inset-bottom)''
		}

		/* 隐藏滚动条 */
		.order-list::-webkit-scrollbar {
			width: 0;
		}

		.btn-menu {
			background-color: #fff;
			height: 100rpx;
			width: 100%;
			padding: 0 34rpx;

			.btn-menu-item {
				height: 100%;
				font-size: 32rpx;
				font-weight: 500;

			}

			.btn-menu-item-choose {
				color: #AB9784;
				position: relative;

				.btn-menu-item-line {
					position: absolute;
					left: calc(50% - 15rpx);
					bottom: 0;
					background-color: #AB9784;
					width: 30rpx;
					height: 10rpx;
					border-radius: 10rpx;
				}
			}
		}

		.order-item:last-child {
			// margin-bottom: env(safe-area-inset-bottom);
		}

		.order-item {
			background-color: #fff;
			border-radius: 30rpx;
			width: 352*2rpx;
			box-sizing: border-box;
			padding: 24rpx 34rpx;
			height: 416rpx;
			margin: 16rpx auto 0;

			.order-item-tit {
				margin-bottom: 24rpx;

				.order-item-tit-l {
					font-size: 12px;
					word-break: break-all;
					overflow: hidden;
					text-overflow: ellipsis;
					width: calc(100% - 60px);
					white-space: nowrap;
					color: #A3A6A4;
				}

				.order-item-tit-r {
					font-size: 28rpx;
					color: #AB9784;
					width: 61px;
					text-align: right;
				}

			}

			.line {
				width: 100%;
				height: 1px;
				border: 1px solid #F4F4F4;
			}

			.goods-info {
				margin-top: 32rpx;
				margin-bottom: 34rpx;

				.goods-info-pic {
					width: 79*2rpx;
					height: 79*2rpx;
					border-radius: 20rpx;
					margin-right: 20rpx;
				}

				.goods-info-detail {
					width: calc(100% - 180rpx);

					.goods-info-detail-tit {
						font-size: 13px;
						color: #3A3A3A;
						width: 100%;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}

					.goods-info-detail-tag {
						margin-top: 16rpx;


						font-size: 10px;
						color: #AB9784;
						line-height: 14px;

						.goods-info-detail-tag-item {
							background: rgba(170, 151, 132, 0.1);
							margin-right: 20rpx;
							box-sizing: border-box;
							padding: 0 14rpx;
						}
					}

					.goods-info-detail-price {
						margin-top: 30rpx;
						font-size: 30rpx;

						view {
							color: #A3A6A4;
							font-size: 24rpx;
						}
					}
				}
			}

			.pay-box {
				color: #3A3A3A;
				margin-top: 18rpx;

				.pay-box-l {
					font-size: 24rpx;

					line-height: 34rpx;

					.pay-box-l-word {
						color: #A3A6A4;
					}

					.pay-box-l-price {
						font-size: 34rpx;

						line-height: 50rpx;
					}
				}

				.pay-box-r {
					width: 260rpx;
					height: 66rpx;
					background-color: $uni-btn-color;
					font-size: 14px;
					border-radius: 40rpx;
				}

			}
		}

		.scroll-Y {
			width: 100%;
			max-height: calc(100vh - 286rpx - env(safe-area-inset-bottom));
		}
	}
</style>