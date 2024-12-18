<template>
	<view class="content">

		<view class="content-box row col ai-c jc-c">
			<view class="time row ai-c jc-c">
				<view class="time-icon">
					<image src="../../static/help/call.png" mode=""></image>
				</view>
				<view class="time-des">
					<view class="time-des-1 row ">
						客服热线 <view class="" @click="callServe">

							{{phoneNumber}}

						</view>
					</view>
					<view class="time-des-2">

						工作时间: 9:30 - 18:00
						<br>客服电话高峰期可能遇忙，请耐心等待

					</view>
				</view>
			</view>
			<view class="qes-list">
				<view class="qes-tit">
					常见问题
				</view>
				<view class="qus-item row jc-sb ai-c" v-for="i,index in listData" :key="index" @click="goPage(i)">
					<view class="qus-item-tit">
						{{i.title}}
					</view>
					<view class="qus-item-icon">
						<image src="../../static/help/more.png" mode=""></image>
					</view>
				</view>

			</view>
		</view>


		<view class="banner">
			<image src="../../static/help/banner.png" mode="aspectFill"></image>
		</view>
		<tarbar :chooseTap="chooseTapNum"></tarbar>
	</view>
</template>

<script>
	import tarbar from '../../component/tarbar.vue'
	import config from '../../config/index.js'
	export default {
		data() {
			return {
				chooseTapNum: 2,
				IMG_URL: config.IMG_URL,
				title: 'Hello',
				listData: [],
				phoneNumber: '',
				listPage: 1,
				listLoading: false,
				limit: 10,
				listAll: 0,

			}
		},
		inject: ['login'],
		components: {

			tarbar
		},
		onLoad() {

		},
		// 监听下拉更新 （重新获取第一页信息）
		onPullDownRefresh() {
			this.initRefresh()
		},
		// 下拉触底函数
		onReachBottom() {
			//加载中就不进行加载
			if (this.listLoading) {
				return
			} else {
				//加载下一页	
				this.listPage++
				this.receivedLetter() //第一次的时候listPage=1

			}
		},

		mounted() {


			var that = this
			this.login().then((res) => {

				that.receivedLetter()
			});

		},

		methods: {
			initRefresh() {
				//初始化信息
				this.listPage = 1
				this.listLoading = false
				this.listData = []
				this.listAll = 0
				this.receivedLetter()
			},

			receivedLetter() {
				// 停止刷新请求条件
				if (this.listData && this.listData.length !== 0 && this.listData.length >= this.listAll) {
					uni.stopPullDownRefresh()
					return
				}

				this.listLoading = true //开始请求

				this.$api.getHelpCenterList({
					page: this.listPage,
					limit: 10,
				}).then(res => {

					this.listLoading = false //请求完成
					this.listData.push(...res.data) //追加数据
					this.listAll = res.recordsTotal
					this.phoneNumber = res.service_phone ? res.service_phone : ''
					this.$forceUpdate()
					uni.stopPullDownRefresh() //停止刷新

				})
			},

			goPage(i) {
				uni.navigateTo({
					url: './detail?biz_id=' + i.biz_id + '&title=' + i.title
				})
			},
			callServe() {
				uni.makePhoneCall({
					phoneNumber: this.phoneNumber, //电话号码
					success: function(e) {
						console.log(e);
					},
					fail: function(e) {
						console.log(e);
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	// 18rpx=10px
	.content {
		position: relative;
		min-height: 100vh;
		width: 100vw;
		background-color: rgba(244, 245, 247, 1);

		.banner {
			top: 0;
			left: 0;
			position: absolute;
			width: 100%;
			height: 380rpx;
			z-index: 1;
		}

		.content-box {
			width: 100%;
			background-color: rgba(244, 245, 247, 1);
			padding: 0 22rpx;
			position: absolute;
			padding-bottom: 220rpx;
			box-sizing: border-box;
			top: 332rpx;
			box-sizing: border-box;

			.time {
				width: 100%;
				background-color: #fff;
				z-index: 11;

				box-sizing: border-box;

				border-radius: 24rpx;
				padding: 0rpx 34rpx;
				height: 200rpx;

				.time-icon {
					width: 94rpx;
					height: 94rpx;
					margin-right: 54rpx;
				}

				.time-des {
					.time-des-1 {
						font-size: 32rpx;
						color: #3A3A3A;

						view {
							margin-left: 10rpx;
							color: #156dd9;
						}
					}

					.time-des-2 {
						font-size: 28rpx;
						color: #A3A6A4;
						margin-top: 10rpx;
						line-height: 40rpx;
					}
				}
			}

			.qes-list {
				width: 100%;
				margin-top: 16rpx;
				color: rgba(58, 58, 58, 1);
				background-color: #fff;



				border-radius: 24rpx;

				.qes-tit {
					box-sizing: border-box;
					padding: 0rpx 34rpx;
					margin: 22rpx 0;
					font-size: 32rpx;
				}

				.qus-item {
					box-sizing: border-box;
					padding: 0rpx 34rpx;
					height: 100rpx;
					border-top: 2rpx solid rgba(244, 244, 244, 1);

					.qus-item-tit {
						font-size: 24rpx;
					}

					.qus-item-icon {

						image {
							width: 12rpx;
							height: 22rpx;
						}
					}
				}
			}
		}
	}
</style>