<template>
	<view class="tarbar row jc-sb ">
		<image class="bg" src="../static/bg.png" mode=""></image>
		<view class="tarbar-item home  col ai-c" :class="chooseTap==0?'choosedTap':''" @click="gopage(0)">
			<view class="icon">
				<image v-if="chooseTap==0" src="../static/index/home2.png" mode=""></image>
				<image v-else src="../static/index/home.png" mode=""></image>
			</view>
			<view class="txt">
				首页
			</view>
		</view>
		<view class="center tarbar-item col ai-c" @click="gopage(1)" :class="chooseTap==1?'choosedTap':''">
			<view class="icon">
				<image src="../static/index/center.png" mode=""></image>
			</view>
			<view class="txt">
				推广中心
			</view>
		</view>
		<view class=" tarbar-item help col ai-c" :class="chooseTap==2?'choosedTap':''" @click="gopage(2)">
			<view class="icon">
				<image v-if="chooseTap==2" src="../static/index/help2.png" mode=""></image>
				<image v-else src="../static/index/help.png" mode=""></image>
			</view>
			<view class="txt">
				帮助
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tarbar',
		props: {
			chooseTap: {

				default: 0,
				typeof: Number
			},

		},

		onLoad() {

		},
		data() {
			return {
				// chooseTap:0,
			}
		},
		methods: {
			gopage(i) {

				if (i == this.chooseTap) {
					return
				}

				if (i == 0) {

					uni.redirectTo({
						url: '/pages/index/index'
					})

				}
				if (i == 1) {

					uni.redirectTo({
						url: '/pages/center/center'
					})

				}
				if (i == 2) {

					uni.redirectTo({
						url: '/pages/help/help'
					})

				}
			}
		}
	}
</script>

<style lang="scss">
	.tarbar {
		// background-color: #fff;
		// border-top: 1px solid rgba(235, 235, 235, 1);
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 204rpx;
		box-sizing: border-box;
		// padding: 0 94rpx;

		.bg {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: -1;
		}

		.tarbar-item {
			width: 33.3%;

			image {
				margin-top: 64rpx;
				width: 28rpx;
				height: 28rpx;
				margin-bottom: 10rpx;
			}

			line-height: 30rpx;
			font-size: 20rpx;
			color:rgba(58, 58, 58, 1);
		}

		.choosedTap {
			color: rgba(171, 151, 132, 1);
		}

		.center {
			width: 142rpx;
			// height: 86rpx;

			border-radius: 30rpx;


			image {
				margin-top: 16rpx;
				width: 76rpx;
				height: 76rpx;
				// margin-bottom: 16rpx;
			}
		}
	}
</style>