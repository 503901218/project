<template>
	<view class="content">

		<navs :tit="title"></navs>
		<view class="empty col f-c" v-if="listData.length==0">
			<view class="empty-pic col f-c">
				<image src="../../static/center/empty.png" mode="widthFix"></image>
				<view class="empty-txt">
					暂无收货地址
				</view>
			</view>

		</view>
		<view class="content-box" v-else>

			<view class="address-list">
				<view class="address-item" @click="chooseAddressItem(i)" v-for="i,index in listData" :key="i.biz_id">
					<view class="address-tit1">
						{{i.province_name}}{{i.city_name}}{{i.district_name}}
					</view>
					<view class="address-tit2">
						{{i.address.replace(i.province_name+i.city_name+i.district_name, "")}}
					</view>
					<view class="address-name ">

						{{i.customer_name}} {{i.phone_no}}
					</view>
					<view class="address-tit3 row jc-sb ai-c">
						<view class="address-tit3-l row ai-c">
							<view class="icon name-icon " @click.stop="chooseMoRenFun(index)"
								:class="i.is_default?'name-icon-choose':''">
								<image src="../../static/index/buy/address1.png" mode=""></image>
							</view> 默认地址
						</view>
						<view class="address-tit3-r row">
							<view class="address-tit3-r-edit row ai-c" @click.stop="goEdit(index)">
								<view class="icon ">
									<image src="../../static/index/buy/edit.png" mode=""></image>
									<!-- <image src="../" mode=""></image> -->
								</view> 修改
							</view>
							<view class="address-tit3-r-del row ai-c" @click.stop="delAddress(true,index)">
								<view class="icon ">
									<image src="../../static/index/buy/del.png" mode=""></image>
								</view>
								删除
							</view>
						</view>
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
					<view class="btn1 row f-c" @click="delAddress(false,null)">
						取消
					</view>
					<view class="btn2 row f-c" @click="delAddress(false,-1)">
						确定
					</view>
				</view>
			</view>
		</view>
		<view class="edit-btn row jc-c">

			<view class=" row  f-c" @click="goEdit(-1)">
				新增地址
			</view>


		</view>
	</view>
</template>


<script>
	import navs from '../../component/nav.vue'
	import config from '../../config/index.js'
	import {
		counterStore
	} from '@/store/index.js'
	export default {
		data() {
			return {
				updateData: true,
				title: '收货地址',
				IMG_URL: config.IMG_URL,
				showDel: false,
				delIndex: null, //删除index
				oldMoRen: 0, //原来的默认地址
				chooseMoRen: 0, //选择默认地址index
				listData: [],
				phoneNumber: '',
				listPage: 1,
				listLoading: false,
				limit: 10,
				listAll: 0,
				listData: [{
					address_code: null,
					address: "",
					biz_id: "",
					city_name: null,
					customer_name: "",
					district_name: null,
					is_default: false,
					phone_no: "",
					province_name: null,
				}],
				goodsId: '',
			}
		},
		inject: ['login'],
		components: {
			navs
		},
		onLoad(e) {
			var that = this
			this.login().then((res) => {
				that.initRefresh()
			});
			if (e.goodsId) {
				this.goodsId = e.goodsId
			}

		},
		// // 监听下拉更新 （重新获取第一页信息）
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
		onShow() {
			this.listData = this.$store.addressList
			this.$forceUpdate()
		},
		onUnload() {
			this.updateAddress()
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
				var htat = this
				// 停止刷新请求条件
				if (this.listData && this.listData.length !== 0 && this.listData.length >= this.listAll) {
					uni.stopPullDownRefresh()
					return
				}

				this.listLoading = true //开始请求
				let obj = {}
				obj.page = this.listPage //重点是这个会变的请求页码
				obj.limit = 10

				var that = this
				if (that.$store.addressList.length == this.listAll) {
					return
				} else {
					this.$api.getCstomerAddress().then(res => {

						if (res.code) {

							this.listLoading = false //请求完成

							this.listData.push(...res.data) //追加数据

							that.listData.forEach((e, index) => {

								if (e.is_default) {
									that.chooseMoRen = index
									that.oldMoRen = index
									that.updateAddress()
								}
							})

							this.listAll = res.recordsTotal
							this.phoneNumber = res.service_phone ? res.service_phone : ''
							this.$forceUpdate()
							uni.stopPullDownRefresh() //停止刷新
						}

					}).catch(err => {
						console.log(err)
					})
				}
			},
			chooseAddressItem(i) {
				this.updateAddress()
				// const obj = { name: 'uniapp', description: 'cross-platform' };
				const objStr = JSON.stringify(i);
				uni.navigateTo({
					url: './buy?id=' + this.goodsId + '&addressObj=' + encodeURIComponent(objStr)
				})
			},
			updateAddress() {
				var that = this
				// 修改默认地址
				if (this.oldMoRen != this.chooseMoRen) {
					this.$store.changge(this.listData[this.chooseMoRen])
					this.$api.addCustomerAddress(this.listData[this.chooseMoRen]).then(res => {
						if (res.code) {
							that.$store.changeAddressList(that.listData)
						}
					})
				}
			},
			getData() { //数据初始
				var that = this
				if (that.$store.addressList.length > 0) {
					return
				} else {
					this.$api.getCstomerAddress().then(res => {
						if (res.code) {
							that.listData = res.data
							that.listData.forEach((e, index) => {

								if (e.is_default) {
									that.chooseMoRen = index
									that.oldMoRen = index
									that.updateAddress()
								}
							})
						}
					})
				}

			},
			// 删除
			delAddress(flag, index) { //flag是展示窗口，index是地址编号
				this.showDel = flag
				var that = this
				if (index != null && index != -1) {
					this.delIndex = index
				}
				if (index == -1) {
					this.$api.delCustomerAddress({
						biz_id: that.listData[that.delIndex].biz_id
					}).then(res => {
						that.listData.splice(that.delIndex, 1)
						that.$store.changeAddressList(that.listData)
						if (that.chooseMoRen == index) {
							that.$store.changge(that.listData[0])
						}
					})
				}
			},
			// 编辑
			goEdit(index, ) { //!=-1修改， -1新增
				if (index == -1) {
					uni.navigateTo({
						url: './create?index=' + index
					})
				} else {
					// console.log(this.listData[index])
					uni.navigateTo({
						url: './create?index=' + index + '&obj=' + encodeURIComponent(JSON.stringify(this
							.listData[index]))
					})
				}

			},

			chooseMoRenFun(index) { //修改默认
				this.chooseMoRen = index
				var that = this

				for (let j = 0; j < this.listData.length; j++) {
					if (index == j && this.listData[index].is_default) {
						break
					}

					if (j != index && this.listData[j].is_default) {

						this.listData[j].is_default = false
						break
					}

				}
				this.listData[index].is_default = true

			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
		background-color: $uni-bg-color;

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

		.content-box {
			width: 100vw;
			overflow: scroll;
			height: calc(100vh - 440rpx);
		}

		.address-list {
			width: 100%;

			.address-item {
				width: 100%;
				margin-top: 26rpx;
				background: #FFFFFF;
				padding: 30rpx 56rpx;
				border-radius: 20rpx;
				box-sizing: border-box;
				color: #3A3A3A;

				.address-tit1 {
					font-size: 28rpx;

					line-height: 40rpx;
				}

				.address-tit2 {
					font-size: 40rpx;
					font-weight: 500;
					line-height: 58rpx;
				}

				.address-name,
				.address-tit3 {
					margin-top: 14rpx;
					font-size: 28rpx;
					color: #A3A6A4;
					line-height: 40rpx;
				}

				.address-tit3 {
					margin-top: 20rpx;

					.address-tit3-l {}

					.address-tit3-r {
						.address-tit3-r-edit {
							margin-right: 60rpx;
						}
					}
				}
			}

			.icon {
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.name-icon {
				border-radius: 50%;
				overflow: hidden;
				border: 1px solid rgba(166, 166, 166, 1);

				image {
					display: none;
				}
			}

			.name-icon-choose {
				border: 0;
				background-color: $uni-btn-color;

				image {
					width: 100%;
					height: 100%;
					display: block;
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
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 128px;
			background-color: #fff;
			padding-top: 28px;
			box-sizing: border-box;

			view {
				font-weight: 500;
				width: 292px;
				height: 44px;
				border-radius: 40rpx;
				color: #3A3A3A;
				background-color: $uni-btn-color;
			}
		}
	}
</style>