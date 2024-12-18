<template>
	<view class="content col ai-c">
		<navs :tit="title"></navs>
		<view class="address">
			<view class="address1 row ai-c">
				<image src="../../static/center/loacl.png" mode=""></image>
				<view class="address1-detail">
					{{info.address.province_name?info.address.province_name:''}}{{info.address.city_name?info.address.city_name:''}}{{info.address.district_name?info.address.district_name:''}}
					{{info.address.address}}

					<!-- 					{{info.address.province_name}}{{info.address.city_name}}{{info.address.district_name}}
					{{info.address.address.replace(info.address.province_name+info.address.city_name+info.address.district_name, "")}} -->
				</view>
			</view>
			<view class="address2 row ai-c">
				{{info.customer}}

			</view>
		</view>


		<view class="order-item col ai-c">

			<view class="goods-info row ">
				<image :src="IMG_URL+info.goods[0].goods_img_url" class="goods-info-pic" mode=""></image>
				<view class="goods-info-detail">
					<view class="goods-info-detail-tit">
						{{info.goods[0].good_name}}

					</view>
					<view class="goods-info-detail-tag row">

						<view class="goods-info-detail-tag-item">
							{{info.delivery_method==1?'包邮送货':'上门自取'}}
						</view>
						<view class="goods-info-detail-tag-item" v-for="i,index in info.goods[0].tags" :key="index">
							{{i.tag_details}}
						</view>
					</view>
					<view class="goods-info-detail-price row ai-c jc-sb">
						￥{{info.goods[0].unit_price}}
						<view class="">
							X{{info.goods[0].qty}}
						</view>
					</view>
				</view>
			</view>
			<view class="line">

			</view>
			<view class="pay-box col ai-c jc-sb">
				<view class="pay-box-l row ai-c jc-sb">
					<view class="pay-box-l-word">
						实付款：
					</view>

					<view class="pay-box-l-price1 row ai-c">
						￥
						<view class="pay-box-l-price1-price">
							{{info.payment_fee?info.payment_fee:0 }}
						</view>
					</view>
				</view>
				<view class="pay-box-l row ai-c jc-sb">
					<view class="pay-box-l-word">
						订单编号：
					</view>

					<view class="pay-box-l-price2">
						{{info.order_no}}
					</view>
				</view>
				<view class="pay-box-l row ai-c jc-sb">
					<view class="pay-box-l-word">
						商品总价：
					</view>

					<view class="pay-box-l-price1 row ai-c">
						￥
						<view class="pay-box-l-price1-price">
							<!-- {{info.total_price ?info.total_price:0}} -->
							{{info.goods[0].qty*info.goods[0].unit_price}}
						</view>
					</view>
				</view>
				<view class="pay-box-l row ai-c jc-sb">
					<view class="pay-box-l-word">
						运费：
					</view>

					<view class="pay-box-l-price1 row ai-c">
						￥
						<view class="pay-box-l-price1-price">
							0
						</view>
					</view>
				</view>
				<view class="pay-box-l row ai-c jc-sb">
					<view class="pay-box-l-word">
						创建时间
					</view>

					<view class="pay-box-l-price2">
						{{info.create_time}}
					</view>
				</view>
				<view class="pay-box-l row ai-c jc-sb">
					<view class="pay-box-l-word">
						付款时间：
					</view>

					<view class="pay-box-l-price2">
						{{info.finish_time}}
					</view>
				</view>
				<view class="pay-box-l row ai-c jc-sb" v-show="info.deliver_time">
					<view class="pay-box-l-word">
						发货时间：
					</view>

					<view class="pay-box-l-price2">
						{{info.deliver_time}}
					</view>
				</view>
				<view class="pay-box-l row ai-c jc-sb" v-show="info.express_company">
					<view class="pay-box-l-word">
						快递公司：
					</view>

					<view class="pay-box-l-price2">
						{{info.express_company }}
					</view>
				</view>
				<view class="pay-box-l row ai-c jc-sb" v-show="info.deliver_no">
					<view class="pay-box-l-word">
						快递单号：
					</view>

					<view class="pay-box-l-price2">
						{{info.deliver_no}} | <span style="color: #000;" @click="copyId">复制</span>
					</view>
				</view>

			</view>
			<view class="pay-box-btn  row f-c">
				<view class="pay-box-r row  f-c" @click="goIndex()"
					:class="!(showBtn&&info.order_state==2)?'pay-box-r-c':''">
					返回首页
				</view>
				<view class="pay-box-r row  f-c" @click="viewLogistics" v-show="showBtn&&info.order_state==5">
					查看物流
				</view>
				<view class="pay-box-l row  f-c" @click="confirm()" v-show="showBtn&&info.order_state==5">
					确认收货
				</view>
			</view>


		</view>
		<view class="tip" v-show="showBtn&&info.order_state==2">
			已支付订单会在7个自然日后自动确认收货
		</view>
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
				title: '已支付',
				id: '',
				info: {

				},
				showBtn: true,
			}

		},
		inject: ['login'],
		components: {
			navs,
		},
		onLoad(e) {
			if (e.id) {
				this.id = e.id
			}

			var that = this
			this.login().then((res) => {
				that.getData()
			});

		},
		methods: {
			copyId() {
				uni.setClipboardData({
					data: this.info.deliver_no,
					success: function() {
						console.log('success');
					}
				});
			},
			goIndex() {
				uni.reLaunch({
					url: '../index/index'
				})
			},
			getData() {
				var that = this
				this.$api.getOrderInfo({
					'biz_id': that.id
				}).then(res => {

					if (res.code) {
						that.info = res.data
						if (res.data.order_state == 4) {
							that.title = '已完成'
						} else if (res.data.order_state == 2) {
							that.title = '已支付'
						} else if (res.data.order_state == 5) {
							that.title = '已发货'
						}
					}
					that.$forceUpdate()
				})
			},
			confirm() {
				var that = this
				const {
					biz_id,
					transaction_id
				} = this.info
				if (wx.openBusinessView) {
					wx.openBusinessView({
						businessType: 'weappOrderConfirm',
						extraData: {
							transaction_id
						},
						success() {
							that.$api.confirmReceipt({
								order_id: biz_id
							}).then(res => {
								if (res.code) {
									that.showBtn = false
									uni.showToast({
										title: '确认收货成功',
										icon: 'none',
										duration: 2000
									})
									uni.navigateTo({
										url: './order'
									})
								}
							})
						},
						fail() {
							//dosomething
							uni.showToast({
								title: '确认收货失败',
								icon: 'none',
								duration: 2000
							})
						}
					});
				} else {
					//引导用户升级微信版本
					uni.showToast({
						title: '确认收货失败',
						icon: 'none',
						duration: 2000
					})
				}
			},
			viewLogistics() {
				plugin.openWaybillTracking({
					waybillToken: this.info.waybill_token
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
		color: #3A3A3A;
		background-color: $uni-bg-color;

		.address {
			background-color: #fff;
			margin-top: 16rpx;
			border-radius: 30rpx;
			width: 352*2rpx;
			box-sizing: border-box;
			padding: 22rpx 34rpx;

			.address1 {
				image {
					width: 36rpx;
					margin-right: 16rpx;
					height: 36rpx;
				}

				.address1-detail {
					font-size: 34rpx;

					line-height: 25px;
				}

			}

			.address2 {
				margin-top: 18rpx;
				font-size: 24rpx;
				line-height: 34rpx;
				color: #A3A6A4;

				view {
					margin-left: 20rpx;
				}
			}
		}

		.order-item {
			background-color: #fff;
			border-radius: 30rpx;
			width: 352*2rpx;
			box-sizing: border-box;
			padding: 34rpx;

			margin-top: 16rpx;



			.line {
				width: 100%;
				height: 1px;
				border: 1px solid #F4F4F4;
			}

			.goods-info {
				margin-top: 32rpx;
				margin-bottom: 34rpx;
				width: 100%;

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

					/* 隐藏水平滚动条 */
					.goods-info-detail-tag::-webkit-scrollbar {
						height: 0;
					}

					.goods-info-detail-tag {
						overflow: scroll;
						margin-top: 16rpx;
						font-size: 20rpx;
						color: #AB9784;
						line-height: 28rpx;

						.goods-info-detail-tag-item {
							background: rgba(170, 151, 132, 0.1);
							margin-right: 20rpx;
							box-sizing: border-box;
							padding: 0 14rpx;
							word-break: normal;
							height: fit-content;
							white-space: nowrap;
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
				width: 100%;

				.pay-box-l {
					font-size: 24rpx;
					width: 100%;
					height: 70rpx;
					line-height: 34rpx;

					// .pay-box-l-word {
					// 	color: #A3A6A4;
					// }

					.pay-box-l-price1 {
						font-size: 24rpx !important;

						.pay-box-l-price1-price {
							font-size: 34rpx !important;
						}

					}

					.pay-box-l-price1 {
						font-size: 24px;


					}

					.pay-box-l-price2 {
						color: #A3A6A4;
					}
				}
			}

			.pay-box-btn {
				width: 100%;
				box-sizing: border-box;
				margin-top: 24rpx;
				display: flex;
				justify-content: space-between;

				.pay-box-r {
					border-radius: 40rpx;
					color: rgba(166, 166, 166, 1);
					border: 1px solid rgba(166, 166, 166, 1);
					height: 76rpx;
					flex:1;
				}

				.pay-box-r-c {
					flex: 1;
				}

				.pay-box-l {
					flex: 1;
					height: 76rpx;
					color: #000;
					background-color: $uni-btn-color;
					font-size: 14px;
					border: 0;
					border-radius: 40rpx;
				}
				
				.pay-box-r:not(:last-child),.pay-box-l:not(:last-child) {
					margin-right: 18rpx;
				}
			}

		}

		.tip {
			text-align: center;
			margin-top: 30rpx;
			font-size: 10px;
			color: #A3A6A4;
			line-height: 14px;
		}
	}
</style>