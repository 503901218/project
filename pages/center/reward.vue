<template>
	<view class="content col ai-c">
		<navs :tit="title"></navs>
		<view class="empty col f-c" v-show="listData.length==0">
			<view class="empty-pic col f-c">
				<image src="../../static/center/empty.png" mode="widthFix"></image>
				<view class="empty-txt">
					{{type==1?'暂无奖励记录':'暂无提现记录'}}
				</view>
			</view>

		</view>
		<view class="reward-list" v-if="type==1&&listData.length>0">
			<view class="reward-item row jc-sb ai-c" v-for="i,index in listData" :key="index">
				<view class="reward-item-tit">
					<view class="reward-item-tit1" v-if="i.distribution_type">
						{{i.distribution_type_txt}}
					</view>
					<view class="reward-item-tit1" v-else>
						{{i.distribution_type==1?'直接奖励':i.distribution_type==2?'间接奖励':'团队奖励'}}
					</view>
					<view class="reward-item-tit2 row">
						<view class="">
							{{i.create_time}}
						</view>
						<!-- 14:01:12 -->
					</view>
				</view>
				<view class="reward-item-tit3 col">
					{{i.amount_of_income}}
					<view class="get-state get-state-fail" v-show="type==2">
						失败
					</view>
				</view>
			</view>

		</view>
		<view class="reward-list" v-if="type==2&&listData.length>0">
			<view class="reward-item row jc-sb ai-c" v-for="i,index in listData" :key="index">
				<view class="reward-item-tit">
					<view class="reward-item-tit1">
						{{i.status==1?'提现中':i.status==2?'已到账':'提现失败'}}
					</view>
					<view class="reward-item-tit2 row">
						<view class="">
							{{i.review_time}}
						</view>
						<!-- 14:01:12 -->
					</view>
				</view>
				<view class="reward-item-tit3 col">
					{{i.amount_of_income.toFixed(2)}}
					<view class="get-state" :class="i.status==3?'get-state-fail':''">
						<!-- {{i.status==3?'失败':i.status==2?'成功':'提现中'}} -->
						{{i.status_txt}}
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import navs from '../../component/nav.vue'
	export default {
		data() {
			return {
				type: 1, //1奖励记录，2提现记录
				title: '奖励记录',
				showList: [{
					"distribution_type": 1, //奖励类型(1, u'直接奖励'), (2, u'间接奖励'), (3, u'团队奖励')
					"amount_of_income": 0, //奖励金额
					"create_time": "2024-10-24T16:34:08", //奖励时间


				}, ],
				listData: [],
				phoneNumber: '',
				listPage: 1,
				listLoading: false,
				limit: 10,
				listAll: 0,
				// 提现列表
				// {
				// "amount_of_income": 1, //提现金额
				// "status": 2, //提现状态(1, u'提现中'), (2, u'已到账'), (3, u'提现失败')
				// "review_time": "2024-10-24T16:39:45" //申请时间
				// }
			}
		},
		inject: ['login'],
		components: {
			navs,
		},
		onLoad(i) {
			this.type = i.type
			if (this.type == 1) {
				this.title = '奖励记录'
			} else {
				this.title = '提现记录'
			}

			var that = this
			this.login().then((res) => {
			
				that.receivedLetter(that.type)
			});

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
				this.receivedLetter(this.type) //第一次的时候listPage=1

			}
		},

		methods: {
			initRefresh() {
				//初始化信息
				this.listPage = 1
				this.listLoading = false
				this.listData = []
				this.listAll = 0
				this.receivedLetter(this.type)
			},

			receivedLetter(i) {
				
				// 停止刷新请求条件
				if (this.listData && this.listData.length !== 0 && this.listData.length >= this.listAll) {
					uni.stopPullDownRefresh()
					return
				}

				this.listLoading = true //开始请求
				let obj = {}
				obj.page = this.listPage //重点是这个会变的请求页码
				obj.limit = 10
			
				if (i == 1) {
					
					this.$api.getSubdivisionInformationList().then(res => {
						
						if (res.code) {
						
							this.listLoading = false //请求完成
							
							this.listData.push(...res.data) //追加数据
							this.listAll = res.recordsTotal
							this.phoneNumber = res.service_phone ? res.service_phone : ''
							this.$forceUpdate()
							uni.stopPullDownRefresh() //停止刷新
						}

					}).catch(err=>{
						console.log(err)
					})
				} else {

					this.$api.getVerificationList().then(res => {
						if (res.code) {
						
							this.listLoading = false //请求完成
							this.listData.push(...res.data) //追加数据
							this.listAll = res.recordsTotal
							this.phoneNumber = res.service_phone ? res.service_phone : ''
							this.$forceUpdate()
							uni.stopPullDownRefresh() //停止刷新
						}

					})
				}

			},
			// getList(i) {
			// 	var that = this
			// 	if (i == 1) {
			// 		this.$api.getSubdivisionInformationList().then(res => {
			// 			if (res.code) {
			// 				// that.showList = res.data
			// 			}
			// 			that.$forceUpdate()
			// 		})
			// 	} else {

			// 		this.$api.getVerificationList().then(res => {
			// 			if (res.code) {
			// 				// that.showList = res.data
			// 			}
			// 			that.$forceUpdate()
			// 		})
			// 	}


			// },

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

		.reward-list {
			margin-top: 18rpx;
			border-radius: 20rpx;
			width: 100%;
			background-color: #fff;
			padding: 0 34rpx;
			box-sizing: border-box;
			padding-bottom: env(safe-area-inset-bottom);
//兼容 iOS>=11.2 
			.reward-item {
				height: 140rpx;
				border-bottom: 1px solid rgba(244, 245, 247, 1);
				font-size: 32rpx;
				color: #3A3A3A;
				line-height: 46rpx;

				.reward-item-tit {





					.reward-item-tit2 {
						font-size: 24rpx;
						color: #A3A6A4 !important;
						line-height: 34rpx;

						view {
							margin-right: 10rpx;
						}
					}
				}

				.reward-item-tit3 {
					align-items: flex-end;

					.get-state {
						padding: 0 8rpx;
						background-color: rgba(28, 172, 54, 0.08);
						font-size: 10px;
						color: #1CAC36;
						line-height: 14px;
						margin-top: 4rpx;


					}

					.get-state-fail {
						background-color: rgba(237, 101, 96, 0.08);

						color: #ED6560;
					}

				}

			}
		}
	}
</style>