<template>
	<page-meta :page-style="'overflow:'+(showShare||showRealName?'hidden':'visible')">
		<view class="content">
			<view class="banner">
				<swiper class="swiper" circular autoplay>
					<swiper-item v-for="i,index in goodsInfo.imgs " :key="index">
						<image :src="IMG_URL+i.thumb_url" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="info">
				<view class="price row ai-c jc-sb">
					<view class="price-l ai-c row jc-c">
						<view>￥</view>{{goodsInfo.sale_price}}
					</view>
					<view class="price-r row  ai-c jc-c" @click="shareItem()">
						<image src="../../static/index/share.png" mode=""></image>
						<view class="">
							分享
						</view>
					</view>
				</view>
				<view class="title">
					<!-- 【官方正品】贵州酒中酒53度酱香型白酒 -->
					{{goodsInfo.goods_name}}
				</view>
				<view class="des-list row ai-c">
					<view class=" row ai-c" v-for="i,index in filterTags(goodsInfo.tags) " :key="i.idx">
						<view class="des-item row col jc-c ai-c">
							<view class="des-item-tit">
								{{i.tag_name}}
							</view>
							<view class="des-item-num">
								{{i.tag_details}}
							</view>
						</view>
						<view class="des-line" v-if="index!= filterTags(goodsInfo.tags).length-1">
						</view>
					</view>
				</view>
			</view>
			<view class="line-box">

			</view>
			<view class="detail-box">
				<view class="detail-box-tit">
					产品介绍
				</view>
				<mp-html :content="goodsInfo.content" />
			</view>
			<view class="buy-btn row f-c" @click="gopage('buy')">
				<image src="../../static/index/btn.png" mode="">

				</image>
				立即购买
			</view>

			<view class="shadow-bg real-name" v-if="showRealName" @touchmove.prevent>
				<view class="container col ai-c">
					<view class="tit">
						禁止向未成年人出售烟酒 <br />
						完成实名制才能购买此商品
					</view>
					<view class="btn-box row">
						<view class="btn1 row f-c" @click="showRealName=false">
							取消
						</view>
						<view class="btn2  row f-c" @click="gopage('center')">
							实名制
						</view>
					</view>
				</view>
			</view>
			<view class="shadow-bg share" v-if="showShare">
				<view class="container">
					<view class="body showApiBg" v-if="postUrl">
						<image :src="IMG_URL+postUrl" mode=""></image>
					</view>
					<view class="body" v-else>

						<image src="../../static/index/sharebg.png" />
						<view class="share-info">
							<view class="price">{{goodsInfo.sale_price}}</view>
							<view class="name">{{goodsInfo.goods_name}}</view>
							<!-- <view class="value">{{goodsInfo.tags.map(item => item.tag_details).join(" ")}}</view> -->
						</view>
						<view class="tip">
							<view>长按图片查看详情</view>
							<view>支持物流配送和上门取货</view>
						</view>
					</view>
					<view class="button" @click="savePost">保存图片</view>
					<view class="share-tip">保存图片分享，或点击右上方转发小程序</view>
				</view>
				<view class="close">
					<image src="../../static/center/close.png" @click="showShare = false" />
				</view>
			</view>
			<canvas canvas-id="post"
				style="width: 616px;height: 977px;position: fixed;visibility: hidden;top: 0;left: 100%;" />
			<tarbar :chooseTap="chooseTapNum"></tarbar>
		</view>
	</page-meta>
</template>

<script>
	import config from '../../config/index.js'
	import tarbar from '../../component/tarbar.vue'
	export default {
		data() {
			return {
				chooseTapNum: 0,
				title: 'Hello',
				IMG_URL: config.IMG_URL,
				goods_code: null,
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
				showShare: false,
				showRealName: false, //实名提示弹窗
				postUrl: null,
			}
		},
		inject: ['login'],
		components: {
			tarbar
		},
		onLoad(options) {
			console.info('options', options)
			if (options.scene) { // 从扫码进来的
				var scene_val = options.scene
				if (scene_val) {
					console.info('scene_val', decodeURIComponent(scene_val))
					var scene_arr = (decodeURIComponent(scene_val)).split(',')
					if (scene_arr && scene_arr.length > 1) {
						var goods_code = scene_arr[0].replace('good=', '')
						if (goods_code) { // 有时候是分享别的商品，也要赋值进来，然后显示这个商品
							this.goods_code = goods_code
						}
						var distributor_code = scene_arr[1].replace('distributor=', '')
						if (distributor_code && distributor_code != this.$store.userInfo.distributor_code) { // 分享者随机码
							this.$store.setDistributorCode(distributor_code)
						}
					}
				}
			} else { // 从分享卡片进来的
				if (options.good) { // 有时候是分享别的商品，也要赋值进来，然后显示这个商品
					this.goods_code = options.good
				}
				if (options.distributor && options.distributor != this.$store.userInfo.distributor_code) { // 分享者随机码
					this.$store.setDistributorCode(options.distributor)
				}
			}
		},
		onShow() {
		var that = this
		this.login().then((res) => {
			// if(that.$store.userInfo.distributor_code!=null){
			// 	that.getData()
			// }
			that.getGoodsInfo()
		});
		},
		mounted() {
			// if (!this.$store.sessionId) {
			// 	this.initGetSessionID()
			// } else {
			// 	this.getGoodsInfo()
			// }
		},
		// 分享函数
		onShareAppMessage(res) {
			return {
				title: '曌卿欣酒业商城',
				path: 'pages/index/index?good=' + (this.goodsInfo.goods_code).toString() + '&distributor=' + (this.$store
					.userInfo.distributor_code ? this.$store.userInfo.distributor_code : '').toString()
			}
		},
		methods: {

			initGetSessionID() {
				var that = this
				uni.login({
					provider: 'weixin', //使用微信登录
					success: function(loginRes) {
					
						that.$api.miniJscodeToSession({
							js_code: loginRes.code
						}).then(res => {
							if (res.code) {
								that.$store.getSessionId(res.data.user_info.session_id)
								that.$store.getUserId(res.data.user_id)
								that.$store.getUserInfo(res.data.user_info)
							
								that.getGoodsInfo()
							}
						})
					}
				});
			},
			async shareItem() { //分享

				if (this.postUrl) {
					this.showShare = true
				} else {
					uni.showLoading({
						title: "海报生成中",
					})
					const res = await this.$api.getDistributionPosterApi({
						good_id: this.goodsInfo.biz_id
					})
					if (res) {
						this.postUrl = res.data
						this.showShare = true
						const ctx = wx.createCanvasContext('post')
						wx.getImageInfo({
							src: this.IMG_URL + res.data, // 图片地址
							success: (res) => {
								ctx.drawImage(res.path, 0, 0, 616, 977)
								ctx.draw()
							}
						})
						uni.hideLoading()
					} else {
						uni.showToast({
							title: "海报生成失败",
							icon: 'none'
						})
						uni.hideLoading()
					}
				}
			},
			savePost() {
				wx.canvasToTempFilePath({
					canvasId: "post",
					success: (res) => {
						const tempFilePath = res.tempFilePath;
						//保存二维码
						wx.getSetting({
							success: (resp) => {

								wx.saveImageToPhotosAlbum({
									filePath: tempFilePath,
									success: function(respo) {
										wx.showToast({
											title: '保存图片成功',
										})
									},
									fail: function(errorA) {
										console.log(errorA)
										wx.showToast({
											title: '保存图片失败',
										})
									}
								})
							},
							fail: (error) => {
								console.log(error)
							}
						})
					},
					fail: function(err) {
						console.log(err);
					}
				});
			},
			getGoodsInfo() {
				var that = this
				var goodsCode = ''
				if (that.goods_code) {
					goodsCode = that.goods_code
				}
				// 不传参 直接返回第一个产品
				this.$api.getGoodsInfo({
					'goods_code': goodsCode
				}).then(res => {
					if (res.code) {
						that.goodsInfo = res.data
					}

				})
			},
			gopage(i) {
				if (i == 'buy') {
					console.log(this.$store.userInfo.distributor_code)
					if (this.$store.userInfo.distributor_code == null) {
						this.showRealName = true
					} else {
						this.showRealName = false
					
						uni.navigateTo({
							url: '/pages/index/buy?id=' + this.goodsInfo.biz_id
						})
					
					}

				}
				if(i=='center'){
					this.showRealName=false
					uni.navigateTo({
						url: '/pages/center/center?showForm=true'
					})
				}
			},
			filterTags(arr) {
				return arr.filter(item => item.is_show)
			}
		}
	}
</script>

<style lang="scss">
	// 18rpx=10px
	.content {
		width: 100vw;

		.banner {
			width: 100%;
			height: 100vw;

			swiper {
				width: 100%;
				height: 100%;
			}
		}

		.info {
			width: 100%;
			padding: 30rpx 34rpx;
			box-sizing: border-box;

			.price {
				color: rgba(171, 151, 132, 1);

				.price-l {
					font-size: 48rpx;

					view {
						font-size: 34rpx;
					}
				}

				.price-r {
					font-size: 28rpx;

					image {
						margin-right: 10rpx;
						width: 24rpx;
						height: 28rpx;
					}
				}
			}

			.title {
				font-weight: 500;
				font-size: 34rpx;
				color: rgba(58, 58, 58, 1);
			}

			/* 隐藏水平滚动条 */
			.des-list::-webkit-scrollbar {
				height: 0;
			}

			.des-list {
				background-color: rgba(250, 250, 250, 1);
				padding: 24rpx;
				box-sizing: border-box;
				margin-top: 26rpx;
				margin-bottom: 48rpx;
				overflow: scroll;
				width: fit-content;
				max-width: 100%;

				.des-item {
					.des-item-tit {
						font-size: 28rpx;
						font-weight: 400;
						white-space: nowrap;
					}

					.des-item-num {
						margin-top: 4rpx;
						white-space: nowrap;
						font-size: 24rpx;
						color: rgba(163, 166, 164, 1);
					}
				}

				.des-line {
					margin: 0 40rpx;
					width: 1px;
					height: 40rpx;
					border: 1px solid #E8EAEC;
				}
			}



		}

		.line-box {
			width: 100%;
			height: 14rpx;
			background: #F4F5F7;
		}

		.detail-box {
			padding: 22rpx 34rpx;
			font-size: 32rpx;
			line-height: 46rpx;
			padding-bottom: 300rpx;
			box-sizing: border-box;

			.detail-box-tit {
				font-size: 32rpx;
				color: #3A3A3A;
			}
		}

		.buy-btn {
			position: fixed;
			bottom: 215rpx;
			left: 58rpx;
			width: 628rpx;
			height: 76rpx;
			font-size: 28rpx;

			image {
				position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
			}
		}

		.shadow-bg {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			z-index: 9;
			background: rgba(0, 0, 0, .5);
		}

		.real-name {
			.container {
				width: 600rpx;
				height: 320rpx;
				opacity: 1;
				border-radius: 45.35rpx;
				background: rgba(255, 255, 255, 1);
				text-align: center;

				.tit {
					margin-top: 70rpx;
					font-size: 35rpx;
					font-weight: 500;
					color: rgba(58, 58, 58, 1);
					line-height: 50rpx;
				}

				.btn-box {
					margin-top: 23rpx;

					view {
						width: 211rpx;
						height: 76.74rpx;
						opacity: 1;
						border-radius: 45rpx;

					}

					.btn1 {
						color: rgba(166, 166, 166, 1);
						border: 1.74px solid rgba(166, 166, 166, 1);
						margin-right: 65rpx;
					}

					.btn2 {
						color: rgba(58, 58, 58, 1);
						background-color: $uni-btn-color;
					}

				}
			}
		}

		.share {


			.container {
				box-sizing: border-box;
				padding: 32rpx 52rpx;
				border-radius: 52rpx;
				width: 688rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				background: #fff;

				.body {
					box-sizing: border-box;
					border-radius: 36rpx;
					overflow: hidden;
					width: 550rpx;
					height: 902rpx;
					background: url(../../static/index/share-background.png);
					background-size: 100% 100%;
					box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.25);
					display: flex;
					flex-direction: column;
					padding: 18rpx 34rpx 40rpx;

					image {
						width: 490rpx;
						height: 534rpx;
					}

					.share-info {
						margin-top: 20rpx;

						.price {
							font-size: 56rpx;
							color: rgba(171, 151, 132, 1);

							&::before {
								content: "¥";
								font-size: 40rpx;
								margin-right: 4rpx;
							}
						}

						.name {
							font-size: 28rpx;
							color: rgba(58, 58, 58, 1);
							font-weight: 500;
							margin-top: 5px;
						}

						.value {
							font-size: 28rpx;
							color: rgba(163, 166, 164, 1);
						}
					}

					.tip {
						margin-top: auto;
						font-size: 26rpx;
						color: rgba(163, 166, 164, 1);
					}


				}

				.showApiBg {
					padding: 0;

					image {
						height: 100%;
						width: 100%;
					}
				}

				.button {
					margin-top: 32rpx;
					height: 88rpx;
					line-height: 88rpx;
					text-align: center;
					border-radius: 88rpx;
					background: rgba(240, 223, 206, 1);
					font-size: 32rpx;
					font-weight: 500;
					color: rgba(58, 58, 58, 1);
					width: 100%;
				}

				.share-tip {
					font-size: 32rpx;
					color: rgba(166, 166, 166, 1);
					margin-top: 28rpx;
				}
			}

			.close {
				margin-top: 44rpx;
				height: 80rpx;
				width: 80rpx;
			}
		}
	}
</style>