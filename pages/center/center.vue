<template>
	<view class="content">
		<view class="empty col f-c" v-show="!showForm&&!showInfo">
			<view class="empty-pic col f-c">
				<image src="../../static/center/empty.png" mode="widthFix"></image>
				<view class="empty-txt">
					暂未开通推荐码
				</view>
			</view>
			<view class="empty-btn  row f-c" @click="showReg">
				立即开通
			</view>
		</view>
		<view class="reg col ai-c" v-show="showForm&&!showInfo">
			<navs :tit="title"></navs>

			<view class="reg-box">
				<view class="info-item row jc-sb ai-c">
					<view class="info-item-name">
						姓名
					</view>
					<view class="info-item-name-input  row jc-sb ai-c">
						<input v-model="infoForm.name" placeholder="请输入姓名" type="text" />
					</view>
				</view>
				<view class="info-item row jc-sb ai-c">
					<view class="info-item-name">
						身份证号
					</view>
					<view class="info-item-name-input  row jc-sb ai-c">
						<input v-model="infoForm.id_card" placeholder="请输入本人身份证号" type="idcard" />
					</view>
				</view>
				<view class="info-item row jc-sb ai-c">
					<view class="info-item-name">
						出生日期
					</view>
					<view class="info-item-name-input  row jc-sb ai-c">
						<input disabled v-model="infoForm.birth" placeholder="自动识别" type="text" />
					</view>
				</view>
				<view class="info-item row jc-sb ai-c">
					<view class="info-item-name">
						手机号
					</view>
					<view class="info-item-name-input  row jc-sb ai-c">
						<input type="number" v-model="infoForm.phone" placeholder="请输入本人手机号"
							onkeyup="value=value.replace(/[^\d]/g,'')" maxlength=11 />
					</view>
				</view>
				<view class="tips row">
					<view class="tips-icon">
						<image src="../../static/center/btn.png" mode=""></image>
					</view>

					<view class="tips-txt">
						根据相关政策要求，企业禁止向未成年人提供酒类相关服务，请如实填写您的实名信息。
					</view>

				</view>
				<view class="btn row f-c" @click="commit()">
					提交
				</view>
			</view>
		</view>
		<view class="show-center" v-show="showInfo&&!showForm">
			<view class="show-center-top col ">
				<image class="show-center-top-bg" src="../../static/center/banner.png" mode=""></image>
				<view class="show-center-top-info row jc-sb">
					<view class="show-center-top-info-l row f-c">
						<view class="show-center-top-info-pic">

							<image
								:src="showData.status!=3?'../../static/center/user2.png':'../../static/center/user.png'"
								mode=""></image>
						</view>
				
						<view class="show-center-top-info-name col jc-c">
							<view class="name1" v-show="showData.name">
								{{showData.name}}

							</view>

							<view class="name2 remind row ai-c" v-show="showData.status!=3">
								推广权益到期时间：{{showData.review_time}}
							</view>
						</view>

					</view>
					<!-- <view class="show-center-top-info-r row f-c" v-show="showData.status!=3" @click="showCode=true">
						<image :src="IMG_URL+'/'+showData.extend_qr_code"
							mode="">
						</image>

					</view> -->
				</view>
			</view>
			<view class="show-center-detail col f-c">
				<view class="show-center-detail-price row jc-sb ai-c">
					<image class="show-center-detail-price-bg" src="../../static/center/tit.png" mode=""></image>
					<view class="show-center-detail-price-l">
						<view class="show-center-detail-price-l-c">
							累计奖励
						</view>
						<view class="show-center-detail-price-l-n row ">
							{{showData.amount_unwithdrawn.toFixed(2)}}
							<view>元</view>
						</view>
					</view>
					<view class="show-center-detail-price-r" @click="goPage('cash')">
						提现
					</view>
				</view>
				<view class="show-center-detail-btn-list col ai-c">
					<view class="show-center-detail-btn-list1 row ai-c jc-sb">
						<view class="show-center-detail-btn-item row f-c" @click="goReward(1)">
							<image src="../../static/center/icon1.png" mode=""></image>
							<view class="">
								奖励记录
							</view>
						</view>
						<view class="show-center-detail-btn-item row f-c" @click="goReward(2)">
							<image src="../../static/center/icon2.png" mode=""></image>
							提现记录
						</view>
					</view>

					<view class="show-center-detail-btn-list2">
						<view @click="showCodeFun()" class="show-center-detail-btn-item row ai-c jc-sb">
							<view class="show-center-detail-btn-item-l row ai-c">
								<image src="../../static/center/icon3.png" mode=""></image>
								<view class="">
									分享推广码
								</view>
							</view>
							<view class="show-center-detail-btn-item-r">
								<image src="../../static/help/more.png" mode=""></image>
							</view>
						</view>
						<view class="show-center-detail-btn-item row ai-c jc-sb" @click="goPage('order')">
							<view class="show-center-detail-btn-item-l row ai-c">
								<image src="../../static/center/icon4.png" mode=""></image>
								<view class="">
									我的订单
								</view>
							</view>
							<view class="show-center-detail-btn-item-r">
								<image src="../../static/help/more.png" mode=""></image>
							</view>
						</view>
						<view class="show-center-detail-btn-item row ai-c jc-sb" @click="showRewardRule()">
							<view class="show-center-detail-btn-item-l row ai-c">
								<image src="../../static/center/icon5.png" mode=""></image>
								<view class="">
									奖励规则
								</view>
							</view>
							<view class="show-center-detail-btn-item-r">
								<image src="../../static/help/more.png" mode=""></image>
							</view>
						</view>
					</view>

				</view>
			</view>
			<view class=" remind-box row jc-c ai-c" v-show="showData.status!=1 ">

				<image class="remind-icon" src="../../static/center/tip.png" mode=""></image>
				<view class="remind-txt">
					购买1件商品即可激活推广权益
				</view>
			</view>

		</view>

		<view class="show-code col ai-c" v-show="showCode">
			<view class="show-code-detail col ai-c">
				<view class="show-center-detail-tit">
					我的推广码
				</view>
				<view class="show-center-detail-code">
					<image :src="IMG_URL+showData.extend_qr_code" mode=""></image>
				</view>
				<view class="show-center-detail-tips">
					保存图片分享，或点击右上方转发小程序
				</view>
				<view class="show-center-detail-btn row f-c" @click="savePicFun()">
					保存图片
				</view>
			</view>
			<view class="close" @click="showCode=false">
				<image src="../../static/center/close.png" mode=""></image>
			</view>
		</view>
		<tarbar :chooseTap="chooseTapNum"></tarbar>
		<!-- 传对应页面在list数组中位置的索引值 -->

	</view>
</template>

<script>
	import config from '../../config/index.js'
	import navs from '../../component/nav.vue'
	import tarbar from '../../component/tarbar.vue'
	export default {
		inject: ['login'],
		data() {
			return {
				chooseTapNum: 1,
				IMG_URL: config.IMG_URL,
				// activation: true, //是否激活
				showInfo: false, //展示提现信息
				showForm: false, //填写信息表格
				showCode: false, //展示二维码
				title: '完善实名信息',
				showData: { //展示用户信息
					avatar_url: "", //头像
					nickname: "", //昵称
					amount_unwithdrawn: 0, //余额
					extend_qr_code: "", //推广码
					days: 0, //权益到期天数
					status: 3 //权益状态(1, u'未到期'), (2, u'到期'), (3, u'未激活')
				},
				isPhone: false, //是否合法电话号
				isId: false, //是否合法身份证
				infoForm: { //注册表格
					name: "",
					phone: "",
					id_card: "",
					birth: ""
				},
				isCommitIng: false, //正在提交
			}
		},
		components: {
			navs,
			tarbar,
		},
		onLoad(e) {
		
			if (e.showForm) {
				this.showForm = true
			}
		},
		onShow(){
		var that = this
		this.login().then((res) => {
		
			if(that.$store.userInfo.distributor_code!=null){
				that.getData()
			}
			
		});
		},
		watch: {
			'infoForm.id_card': {
				handler(val, oldVal) {

					if (val.length == 18 && !this.checkIdcard(val)) {
					
						uni.showToast({
							title: '请输入18位合法身份证号',
							icon: 'none',
							duration: 2000
						})
						this.infoForm.birth = ''
					}
					if (this.checkIdcard(val)) {
						this.infoForm.birth = this.getBirthday(val)
						this.isId = this.checkIdcard(val) // true
					}
				},
				deep: true
			},
			'infoForm.phone': {
				handler(val, oldVal) {
					this.isPhone = this.isValidPhoneNumber(val)
				},
				deep: true
			},
			'showData.nickname': {
				handler(val, oldVal) {

				},
				deep: true
			}
		},
		
		mounted() {

		
		},
		methods: {

			showCodeFun() { //展示二维码弹窗
				if (this.showData.status != 3) {
					this.showCode = true
				} else {
					uni.showToast({
						title: '需要先激活推广权益',
						icon: 'none',
						duration: 2000
					})
				}
			},
			isValidPhoneNumber(phoneNumber) { //判断是不是手机
				return /^1[3-9]\d{9}$/.test(phoneNumber);
			},
			getBirthday(idCard) { //自动获取出生年月
				const regex = /^(\d{6})(\d{4})(\d{2})(\d{2})/;
				const match = idCard.match(regex);

				if (match) {
					const year = match[2];
					const month = match[3];
					const day = match[4];
					return year + '-' + month + '-' + day
				} else {
					return null; // 身份证格式不正确
				}
			},
			showRewardRule() {
				uni.navigateTo({
					url: '../help/detail?type=reward'
				})
			},
			getData() {
				var that = this
				this.$api.getDistributorInfo().then(res => {

					if (res.code) {
						that.showInfo = true
						
						that.showData = res.data
					
					}
				})
			},
			savePicFun() {

				uni.getSetting({ //获取用户的当前设置
					success: res => {
						if (res.authSetting['scope.writePhotosAlbum']) { //验证用户是否授权可以访问相册
							this.savePicFunss()
						} else {
							uni.authorize({ //重新发起获取授权
								scope: 'scope.writePhotosAlbum',
								success: () => {
									this.savePicFunss()
								},
								fail: () => {
									uni.showToast({
										title: '请打开保存相册权限，再点击保存相册分享',
										icon: 'none',
										duration: 2000
									})
									let timer = setTimeout(() => {
										clearTimeout(timer)
										uni.openSetting({ //调起客户端小程序设置界面,让用户开启访问相册
											success: e => {}
										})
									}, 2000)
								}
							})
						}
					}
				})
			},

			savePicFunss() {
				var _this = this;
				uni.getImageInfo({
					src: this.IMG_URL + this.showData.extend_qr_code,
					success: res => {
						uni.saveImageToPhotosAlbum({
							filePath: res.path,
							success(res) {
								uni.showToast({
									title: '保存成功',
									icon: 'none',
									duration: 2000
								})
							},
							fail(err) {
								uni.showToast({
									title: '保存失败',
									icon: 'error',
									duration: 2000
								})
							}
						})
					},
					fail: err => {
						uni.showToast({
							title: '保存失败',
							icon: 'error',
							duration: 2000
						})
					}
				})

			},
			showReg() {
				this.showForm = true
			},
			goPage(i) {

				if (i == 'order') {
					uni.navigateTo({
						url: './order'
					})
				}
				if (i == 'cash') {
					uni.navigateTo({
						url: './cash?num=' + this.showData.amount_unwithdrawn
					})
				}
			},
			goReward(i) {
		
				uni.navigateTo({
					url: './reward?type=' + i
				})
			},
			checkIdcard(idcard) {
				var Errors = new Array(
					true,
					false, //"身份证号码位数不对!", 
					false, //"身份证号码出生日期超出范围或含有非法字符!", 
					false, //"身份证号码校验错误!", 
					false, //"身份证地区非法!" 
				);
				var area = {
					11: "北京",
					12: "天津",
					13: "河北",
					14: "山西",
					15: "内蒙古",
					21: "辽宁",
					22: "吉林",
					23: "黑龙江",
					31: "上海",
					32: "江苏",
					33: "浙江",
					34: "安徽",
					35: "福建",
					36: "江西",
					37: "山东",
					41: "河南",
					42: "湖北",
					43: "湖南",
					44: "广东",
					45: "广西",
					46: "海南",
					50: "重庆",
					51: "四川",
					52: "贵州",
					53: "云南",
					54: "西藏",
					61: "陕西",
					62: "甘肃",
					63: "青海",
					64: "宁夏",
					65: "新疆",
					71: "台湾",
					81: "香港",
					82: "澳门",
					91: "国外"
				}
				var idcard, Y, JYM;
				var S, M;
				var idcard_array = new Array();
				idcard_array = idcard.split("");
				//地区检验 
				if (area[parseInt(idcard.substr(0, 2))] == null) {
				
					return Errors[4];
				}

				//身份号码位数及格式检验 
				switch (idcard.length) {
					case 18:
						var ereg;
						
						ereg=/^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/
						if (ereg.test(idcard)) { //测试出生日期的合法性 
							//计算校验位 
							S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 +
								(parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 +
								(parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 +
								(parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 +
								(parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 +
								(parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 +
								(parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 +
								parseInt(idcard_array[7]) * 1 +
								parseInt(idcard_array[8]) * 6 +
								parseInt(idcard_array[9]) * 3;
							Y = S % 11;
							M = "F";
							JYM = "10X98765432";
							M = JYM.substr(Y, 1); //判断校验位 
							if (M == idcard_array[17]) return Errors[0]; //检测ID的校验位 
							else {
								
								return Errors[3];
							}
						} else {
						
							return Errors[2];
						}
						break;
					default:
						return Errors[1];
						break;
				}
			},
			// 注册
			commit() {
				var that = this
				if (this.infoForm.name == '') {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (!this.isId) {
					uni.showToast({
						title: '请输入合法身份证号',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (!this.isPhone) {
					uni.showToast({
						title: '请输入合规电话号码(中国大陆电话号)',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (this.isCommitIng) {
					return
				}
				this.isCommitIng = true
				uni.showLoading({
					title:'注册中'
				})
				this.$api.registerDistributorApi(this.infoForm).then(res => {
					that.isCommitIng = false
					if (res.code) {
						uni.hideLoading()
						that.login().then((res) => {
							
							if(that.$store.userInfo.distributor_code!=null){
								that.getData()
							}
							
						});
						
						// that.getData()
						that.showForm = false
					} else {
						
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}

				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					})
				})

			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		background-color: $uni-bg-color;
		height: 100vh;

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

		.reg {
			width: 100%;
			background-color: rgba(244, 245, 247, 1);
			font-size: 28rpx;

			.reg-box {
				margin-top: 22rpx;
				background-color: #fff;
				width: 352*2rpx;
				height: fit-content;
				border-radius: 20rpx;
				padding: 0 34rpx;

				.info-item {
					width: 100%;
					height: 100rpx;
					border-bottom: 1px solid rgba(244, 244, 244, 1);

					.info-item-name-input {

						width: 75%;
						height: 100%;
					}
				}

				.tips {
					margin-top: 18rpx;

					.tips-icon {
						position: relative;
						width: 20rpx;
						height: 20rpx;
						margin-right: 10rpx;

						image {
							position: absolute;
							top: 0;
							left: 0;
						}
					}

					.tips-txt {
						font-size: 20rpx;
						color: #A3A6A4;
						line-height: 28rpx;
						width: calc(100% - 30rpx);
					}


				}

				.btn {
					width: 197*2rpx;
					height: 76rpx;
					background-color: #efdac6;
					border-radius: 40rpx;
					font-size: 28rpx;
					margin: 36rpx auto;
				}
			}
		}

		.show-center {
			width: 100%;

			.show-center-top {
				width: 100%;
				position: relative;
				height: 260rpx;
				justify-content: flex-end;

				.show-center-top-bg {
					position: absolute;
					top: 0;
					left: 0;
				}


				.show-center-top-info {
					padding: 0 38rpx;
					width: 100%;
					align-items: flex-end;
					z-index: 11;

					.show-center-top-info-l {
						.show-center-top-info-pic {
							margin-right: 26rpx;
							width: 122rpx;
							height: 122rpx;
							border-radius: 50%;
							overflow: hidden;

							image {
								width: 122rpx;
								height: 122rpx;
							}
						}

						.show-center-top-info-name {
							.name1 {
								font-size: 34rpx;
								color: #3A3A3A;
								line-height: 50rpx;
							}

							.name2 {
								font-size: 24rpx;
								color: #A3A6A4;
								line-height: 34rpx;
								margin-top: 6rpx;
							}

							.login-btn {

								width: 92*2rpx;
								height: 33*2rpx;
								opacity: 1;
								border-radius: 16.5px;
								background: linear-gradient(90deg, rgba(244, 231, 202, 1) 0%, rgba(247, 203, 151, 1) 99.83%);
								font-size: 20px;
								font-weight: 500;
								color: rgba(140, 119, 100, 1);
							}

						}
					}

					.show-center-top-info-r {
						width: 88rpx;
						height: 88rpx;
						align-items: end;
						margin-bottom: 18rpx;

						image {
							width: 88rpx;
							height: 88rpx;
						}
					}
				}
			}

			.remind-box {
				width: 100%;
				margin-top: 24rpx;

				.remind-icon {
					width: 24rpx;
					height: 24rpx;
					margin-right: 6rpx;
				}

				.remind-txt {


					font-size: 24rpx;
					color: #ED6560;
					line-height: 34rpx;
				}
			}

			.show-center-detail {
				width: 100%;
				padding: 52rpx 24rpx 0;
				font-size: 28rpx;
				color: #3A3A3A;
				line-height: 40rpx;
				box-sizing: border-box;

				.show-center-detail-price {
					width: 660rpx;
					height: 116rpx;
					position: relative;
					padding: 0 34rpx;

					.show-center-detail-price-bg {
						position: absolute;
						left: 0;
						top: 0;
						width: 660rpx;
						height: 116rpx;
					}

					.show-center-detail-price-l {
						color: #fff;
						z-index: 1;

						.show-center-detail-price-l-c {
							font-size: 20rpx;
							line-height: 30rpx;
						}

						.show-center-detail-price-l-n {
							font-size: 38rpx;
							align-items: baseline;
							line-height: 56rpx;

							view {
								margin-left: 10rpx;
								font-size: 24rpx;
								color: #FFFFFF;
								line-height: 34rpx;

							}
						}
					}

					.show-center-detail-price-r {
						z-index: 1;
						padding: 8rpx 46rpx;
						box-sizing: border-box;
						height: fit-content;
						background: linear-gradient(90deg, #F4E7CA 0%, #F7CB97 100%);
						border-radius: 38rpx;
						font-size: 28rpx;
						color: #8B7663;
						line-height: 40rpx;
					}

				}

				.show-center-detail-btn-list {
					width: 704rpx;
					background-color: #fff;
					border-radius: 20rpx;
					padding: 0 22rpx;
					box-sizing: border-box;



					.show-center-detail-btn-list1 {
						width: 100%;
						margin-top: 34rpx;

						.show-center-detail-btn-item {
							width: 320rpx;
							height: 116rpx;
							background: rgba(0, 0, 0, 0.03);

							image {
								width: 42rpx;
								height: 42rpx;
								margin-right: 18rpx;
							}
						}
					}

					.show-center-detail-btn-list2 {
						width: 100%;

						.show-center-detail-btn-item {
							height: 100rpx;
							box-sizing: border-box;

							padding-left: 22rpx;

							.show-center-detail-btn-item-l {
								image {
									width: 34rpx;
									height: 34rpx;
									margin-right: 20rpx;
								}
							}

							.show-center-detail-btn-item-r {
								image {
									width: 12rpx;
									height: 22rpx;

								}
							}

						}

						.show-center-detail-btn-item:nth-child(2) {
							border-top: 1px solid rgba(244, 244, 244, 1);
							border-bottom: 1px solid rgba(244, 244, 244, 1);
						}
					}

				}

			}
		}

		.show-code {
			z-index: 11;
			width: 100vw;
			height: 100vh;
			position: absolute;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.30);

			.show-code-detail {
				margin-top: 408rpx;
				width: 600rpx;
				height: 812rpx;
				background: #FFFFFF;
				border-radius: 40rpx;

				.show-center-detail-tit {
					margin-top: 46rpx;
					font-size: 28rpx;
					color: #3A3A3A;
					line-height: 40rpx;
					text-align: center;
				}

				.show-center-detail-code {
					margin-top: 28rpx;
					width: 227*2rpx;
					height: 227*2rpx;
					background: rgba(171, 151, 132, 0.1);
					padding: 28rpx;
					box-sizing: border-box;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.show-center-detail-tips {
					font-size: 28rpx;
					color: #A3A6A4;
					line-height: 40rpx;
					margin-top: 20rpx;
				}

				.show-center-detail-btn {
					margin-top: 32rpx;
					width: 510rpx;
					border-radius: 40rpx;
					height: 76rpx;
					background-color: #efdac6;
					font-size: 28rpx;
					color: #3A3A3A;
					line-height: 40rpx;
					margin-bottom: 66rpx;
				}
			}

			.close {
				margin-top: 56rpx;
				width: 70rpx;
				height: 70rpx;
			}

		}
	}
</style>