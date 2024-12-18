<template>
	<view class="content">
		<view class="navs">
			<view class="navs-box row ai-c">
				<view class="back" @click="goback()">

					<image src="../../static/back2.png" mode=""></image>
				</view>
				<view class="tit">
					{{title}}
				</view>
			</view>

		</view>
		<view class="content-box col ai-c">
			

			<view class="top-banner">
				<image src="../../static/center/cash.png" mode=""></image>
				<view class="top-banner-tit1">
					累计奖励（元）
				</view>
				<view class="top-banner-tit2 row">
					￥<view> {{num>0?num.toFixed(2):'0.00'}}</view>
				</view>
			</view>
			<view class="get-cash">
				<view class="get-cash-tit">
					提现金额
				</view>
				<view class="get-cash-info row ai-c jc-sb">
					<view class="get-cash-info-l row ai-c">
						￥<view class="get-cash-info-input">
							<input type="number" v-model="guestGetNum" />
						</view>
					</view>

					<view class="get-cash-info-r" @click="getAll()">
						全部提现
					</view>
				</view>
				<view class="line">

				</view>
				<view class="tips">
					{{tips}}
				</view>
				<view class="com-btn row f-c" :class="tips.length>0||guestGetNum==0?'unbtn':''" @click="getCash()">
					提交
				</view>
			</view>
			<view class="des">
				<view class="des-tit">
					提现规则
				</view>
				<view class="des-detail">
					<!-- 分享时机，在不同的时机分析用户是否有分享的意愿，提供给他们合适的分享内容，能让分享的效果更好。
					<view class="des-detail-br">

					</view>
					现在很多APP在用户截图时会自动提示用户是否要进行分享。这个时机确实抓的很棒，一般来说，用户截图大多数时候都是为了分享给他人，少部分是为了留底备份。<view
						class="des-detail-br">

					</view>
					所以监听用户的截图操作，提示用户进行分享...<br /> -->
					<mp-html :content="rulesContents" />

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '提现',
				guestGetNum: 0,
				num: 0, //账户余额，可提现金额
				tips: '',
				// rules:'',
				rulesContents: '<div>Hello World!</div>',
			}
		},
		inject: ['login'],
		onLoad(e) {
			this.num = Math.floor(e.num)
		},
		watch: {
			guestGetNum(val, oldVal) {
				if (val > this.num) {
					this.tips = '输入金额超出提现余额'
				} else {
					this.tips = ''
				}
			}
		},
		mounted() {
			var that = this
			this.login().then(res => {
				that.$api.getVerificationRules().then(res => {

					that.rulesContents = res.data
				})
			})

		},
		methods: {
			getAll() {
				this.guestGetNum = this.num
			},
			goback() {
				uni.navigateBack()
			},
			getCash() {

				var that = this

				if (this.tips.length > 0 || this.guestGetNum == 0) {
					uni.showToast({
						title: '未能提现',
						icon: 'none',
						duration: 2000
					})
					return
				}
				this.$api.applyVerification({
					amount_of_income: parseFloat(that.guestGetNum)
				}).then(res => {
					if (res.code) {
						uni.showToast({
							title: '提现成功',
							icon: 'success',
							duration: 2000,
							complete: function() {
								that.$api.getDistributorInfo().then(res => {

									if (res.code) {
										that.num = res.data.amount_unwithdrawn
										// setTimeout(function(){
										// 	uni.navigateBack()
										// },1000)
										
									}
									// console.log('that.showData', that.showData)
								})
							}
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
		height: 100vh;
		position: relative;
		background-color: rgba(244, 245, 247, 1);

		.navs {
			width: 100vw;
			height: 176rpx;
			// background-color: #fff;
			font-size: 34rpx;
			color: #fff;
			position: relative;
			z-index: 11;

			.navs-box {
				position: absolute;
				box-sizing: border-box;
				top: 0;
				width: 100%;
				padding: 0 30rpx;
				margin-top: 104rpx;
			}

			.back {
				position: absolute;
				left: 30rpx;
				width: 16rpx;
				height: 28rpx;

				image {
					z-index: 11;
					// transform: rotate(180deg);
				}
			}

			.tit {
				text-align: center;
				width: 100%;
			}
		}


		.content-box {
			z-index: 1;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			color: #3A3A3A;

			.top-banner {
				width: 100%;
				height: 480rpx;
				position: absolute;
				color: #FFFFFF;
				padding: 0 28rpx;
				box-sizing: border-box;

				image {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 480rpx;
					z-index: -1;
				}

				.top-banner-tit1 {
					font-size: 24rpx;

					line-height: 34rpx;
					margin-top: 200rpx;

				}

				.top-banner-tit2 {
					font-size: 38rpx;
					align-items: baseline;

					view {
						font-size: 78rpx;

						line-height: 114rpx;
					}
				}
			}

			.get-cash {
				margin-top: 193*2rpx;
				background-color: #FFFFFF;
				width: 352*2rpx;
				height: 219*2rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				padding: 34rpx;
				box-sizing: border-box;

				.get-cash-tit {

					line-height: 40rpx;
					font-size: 28rpx;
				}

				.get-cash-info {
					margin-top: 26rpx;

					.get-cash-info-l {
						font-size: 68rpx;
						font-weight: 600;
						line-height: 114rpx;

						.get-cash-info-input {

							input {
								height: 58rpx;
								width: 400rpx;
								font-size: 50rpx !important;

							}
						}
					}



					.get-cash-info-r {
						font-size: 28rpx;
						color: #AB9784;
						line-height: 40rpx;
					}
				}

				.line {
					margin-top: 30rpx;
					width: 100%;
					height: 1px;
					border: 1px solid #F4F4F4;
				}

				.tips {
					font-size: 28rpx;
					color: #fe746f;
					height: 68rpx;
					line-height: 68rpx;
				}

				.com-btn {
					margin: 0 auto;
					width: 510rpx;
					border-radius: 40rpx;
					height: 76rpx;
					background-color: #efdac6;
					font-size: 28rpx;

				}

				.unbtn {
					opacity: 0.5;

				}
			}

			.des {
				padding: 0 56rpx;
				box-sizing: border-box;
				margin-top: 52rpx;
				color: #A3A6A4;
				width: 100%;
				line-height: 14px;

				.des-tit {
					font-size: 11px;
				}

				.des-detail {
					margin-top: 14rpx;
					font-size: 10px;
					line-height: 14px;

					.des-detail-br {
						width: 100%;
						height: 5px;
					}
				}
			}
		}


	}
</style>