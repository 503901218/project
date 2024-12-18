<template>
	<view class="content">
		<navs :tit="title"></navs>
		<view class="reg col ai-c">

			<view class="reg-box">
				<view class="info-item row jc-sb ai-c">
					<view class="info-item-name">
						收件人
					</view>
					<view class="info-item-name-input  row jc-sb ai-c">
						<input v-model="obj.customer_name" placeholder="请输入姓名" type="text" />
					</view>
				</view>
				<view class="info-item row jc-sb ai-c">
					<view class="info-item-name">
						联系方式
					</view>
					<view class="info-item-name-input  row jc-sb ai-c">
						<input v-model="obj.phone_no" placeholder="请输入本人联系方式" type="text" />
					</view>
				</view>
				<view class="info-item row jc-sb ai-c">
					<view class="info-item-name">
						所在地区
					</view>
					<view @click="open()" class="info-item-name-input  row jc-sb ai-c">
						<input disabled v-model="infoForm.add1" placeholder="请选择" type="text" />
					</view>
				</view>
				<view class="info-item  info-item-text row jc-sb ">
					<view class="">
						<!-- 详细地址 -->
						<textarea disabled class="info-item-name" placeholder-style="color:#000" placeholder="详细地址"
							name="" id="" cols="30" rows="10"></textarea>
					</view>
					<view class="info-item-name-text  row jc-sb ai-c">

						<textarea v-model="obj.address" placeholder="详细地址" name="" id="" cols="30" rows="10"></textarea>
					</view>
				</view>

			</view>
		</view>



		<view class="del-win row jc-c" v-show="showDel">
			<view class="del-win-box col ai-c">
				<view class="del-win-box-tit">
					确定要删除该地址吗？
				</view>
				<view class="del-win-box-list row ">
					<view class="btn1 row f-c" @click="delAddress(false,-1)">
						取消
					</view>
					<view class="btn2 row f-c" @click="delAddress(false,1)">
						确定
					</view>
				</view>
			</view>
		</view>
		<view class="edit-btn row ">
			<view class=" edit-btn1 row  f-c" @click="delAddress(true,-1)">
				删除
			</view>
			<view class="edit-btn2 row  f-c" @click="commit()">
				确认
			</view>


		</view>
		<button class="user-wx-address" open-type="chooseAddress" @click="chooseaddress"> 使用微信地址</button>
		<!-- <view class="user-wx-address" @click="">
			使用微信地址
		</view> -->

		<!-- <button @tap="open">打开</button> -->
		<cityPicker :column="column" :default-value="defaultValue" :mask-close-able="maskCloseAble" @confirm="confirm"
			@cancel="cancel" :visible="visible" />
		<!-- <view>{{str}}</view> -->

	</view>
</template>


<script>
	import navs from '../../component/nav.vue'
	import config from '../../config/index.js'
	import cityPicker from '@/uni_modules/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker'

	export default {
		data() {
			return {
				title: '新增地址',
				IMG_URL: config.IMG_URL,
				showDel: false, //删除弹窗展示
				infoForm: {
					add1: '', //省市区

				},
				obj: {
					address_code: null,
					address: "",
					biz_id: "",
					city_name: null,
					customer_name: "",
					district_name: null,
					is_default: false,
					phone_no: "",
					province_name: null,
				},
				typeCreate: 0, //0是编辑，-1是新增
				visible: false,
				maskCloseAble: true,
				defaultValue: '420103',
				// defaultValue: ['河北省','唐山市','丰南区'],
				column: 3,
				isPhone: false, //手机号校验
			}
		},
		inject: ['login'],
		components: {
			navs,
			cityPicker
		},
		watch: {

			'obj.phone_no': {
				handler(val, oldVal) {
					this.isPhone = this.isValidPhoneNumber(val)
				},
				deep: true
			},

		},
		onLoad(e) {
			this.typeCreate = e.index

			if (e.index != -1) { //编辑 ，-1新建
				this.obj = JSON.parse(decodeURIComponent(e.obj))
				this.title = "修改地址"
				this.infoForm.add1 = this.obj.province_name + this.obj.city_name + this.obj.district_name


			}

		},
		mounted() {
			this.login()
		},
		methods: {
			chooseaddress(e) { //获取微信地址

				var that = this
				wx.chooseAddress({
					success: (res) => {
						that.infoForm.add1 = res.provinceName + res.cityName + res.countyName
						
						that.obj.province_name = res.provinceName
						that.obj.city_name = res.cityName
						that.obj.district_name = res.countyName

						that.obj.address = res.detailInfo
						that.obj.customer_name = res.userName
						that.obj.phone_no = res.telNumber
					}
				})
			},
			isValidPhoneNumber(phoneNumber) { //判断是不是手机

				var mobile = phoneNumber;
				var tel = /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/
				var phone = /^((\+|00)86)?1\d{10}$/;
				if (mobile.length == 11) { //手机号码

					return phone.test(phoneNumber);
				} else { //电话号码

					return tel.test(mobile)

				}

			},
			delAddress(flag, index) { //flag是展示窗口，index=1确认删除
				this.showDel = flag
				if (this.typeCreate != -1 && index == 1) {
					var that = this
					this.$api.delCustomerAddress({
						biz_id: that.obj.biz_id
					}).then(res => {

						var addressListss = that.$store.addressList
						addressListss.splice(that.typeCreate, 1)
						that.$store.changeAddressList(addressListss)

						// that.obj.biz_id = null
						if (that.obj.is_default) { //删除的是默认地址
							that.$store.changge(addressListss[0]) //设store默认对象的id为null
						}
					})
				}
				uni.navigateBack()

			},
			commit() {
				var that = this
				if (this.obj.customer_name.length == 0) {
					uni.showToast({
						title: '请输入收件人名称',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (!this.isPhone) {
					uni.showToast({
						title: '请输入有效的号码',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (this.infoForm.add1.length == 0) {
					uni.showToast({
						title: '选择地区',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (this.obj.address.length == 0) {
					uni.showToast({
						title: '选择输入具体地址',
						icon: 'none',
						duration: 2000
					})
					return
				}
				this.$api.addCustomerAddress(this.obj).then(res => {
					uni.showToast({
						title: '成功',
						icon: 'none',
						duration: 2000
					})
					that.$api.getCstomerAddress().then(res => {
						if (res.code) {
							that.$store.changeAddressList(res.data)
							for (let i = 0; i < res.data.length; i++) {
								if (res.data[i].is_default) {
									that.$store.changge(res.data[i])
									break
								}
							}
							uni.navigateBack()
						}

					})
				})


			},
			open() {
				this.visible = true
			},
			confirm(val) { //选中城市
				this.obj.province_name = val.provinceName
				this.obj.city_name = val.cityName
				this.obj.district_name = val.areaName
				this.infoForm.add1 = this.obj.province_name + this.obj.city_name + this.obj.district_name
				this.obj.address_code = val.code

				this.visible = false
			},
			cancel() {
				this.visible = false
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
		background-color: $uni-bg-color;

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
					line-height: 21px;

					.info-item-name-input {

						width: 75%;
						height: 100%;
					}

					.info-item-name-text {
						width: 75%;


						textarea {
							line-height: 21px;
							margin-top: 24rpx;
							padding: 0;
							width: 100%;
							height: 76px; // 132rpx;

						}
					}
				}

				.info-item-text {

					box-sizing: border-box;
					height: auto;
					padding-bottom: 38rpx;

					.info-item-name {
						color: #000;
						margin-top: 24rpx;
						width: 80px;
						height: 40px;
					}
				}

			}
		}

		.del-win {

			width: 100vw;
			height: 100vh;
			background-color: rgba(0, 0, 0, 0.30);
			position: fixed;
			top: 0;
			z-index: 111;

			.del-win-box {
				margin-top: 660rpx;
				width: 304*2rpx;
				height: 184*2rpx;
				background: #FFFFFF;
				border-radius: 40rpx;

				.del-win-box-tit {
					font-size: 20px;
					margin-top: 96rpx;
					color: #3A3A3A;
					line-height: 29px;
				}

				.del-win-box-list {
					margin-top: 68rpx;
					width: 100%;
					justify-content: space-evenly;

					view {
						border-radius: 30rpx;
						width: 121px;
						height: 44px;
					}

					.btn1 {
						border: 1px solid #A6A6A6;
						color: #A6A6A6;
					}

					.btn2 {
						background-color: $uni-btn-color;
						color: #3A3A3A;
					}
				}
			}

		}

		.edit-btn {
			margin-top: 58rpx;
			justify-content: space-evenly;

			view {

				height: 88rpx;
				border-radius: 40rpx;

			}

			.edit-btn1 {
				width: 109*2rpx;
				border: 1px solid #A6A6A6;
				color: #A6A6A6;
			}

			.edit-btn2 {
				width: 217*2rpx;
				background-color: $uni-btn-color;
				color: #3A3A3A;
			}
		}

		.user-wx-address {
			font-size: 28rpx;
			color: rgba(81, 180, 25, 1);
			margin: 0 auto;
			background-color: unset;
			height: fit-content;
			margin-top: 42rpx;
		}

		.user-wx-address::after {
			border: none;

		}
	}
</style>