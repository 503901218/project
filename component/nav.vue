<template>
	<view class="navs">
		<view class="navs-box row ai-c">
			<view class="back row f-c" @click="goback()">
				<image src="../static/back.png" mode=""></image>
			</view>
			<view class="tit">
				{{tit}}
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'navs',
		props: {
			types: {
				default: false,
				typeof: Boolean
			},
			redirect: { //用于
				default: false,
				typeof: Boolean
			},
			tit: {
				default: 'txt',
				typeof: String
			}
		},
		methods: {
			goback() {
				if (this.types) {
					this.$emit('back', true)
				}
				if (this.redirect) {
					this.$emit('redirect', true)

				} else {
					uni.navigateBack()
				}


			}
		}
	}
</script>

<style lang="scss">
	.navs {
		width: 100vw;
		height: 176rpx;
		background-color: #fff;
		font-size: 34rpx;

		position: relative;

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
			width: 50rpx;

			image {
				width: 16rpx;
				height: 28rpx;
			}
		}

		.tit {
			text-align: center;
			width: 100%;
		}
	}
</style>