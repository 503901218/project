<template>
	<view class="content">

		<navs :tit="title"></navs>
		<view class="content-info">
			<mp-html :content="detailContents" />
		</view>

	</view>
</template>


<script>
	import navs from '../../component/nav.vue'
	import config from '../../config/index.js'
	export default {
		data() {
			return {
				title: '常见问题',
				IMG_URL: config.IMG_URL,
				detailContents: '<div>Hello World!</div>',
				id: null,
				type: 1, //1奖励 2问题描述
			}
		},	inject: ['login'],
		components: {
			navs,
		},
		onLoad(e) {
			if (e.type == 'reward') { //奖励描述
				this.type = 1
				this.title='奖励规则'
			} else {
				this.id = e.biz_id //问题
				this.type = 2
				
			}
		},
		mounted() {
		
			var that = this
			this.login().then((res) => {
				that.getData(that.type)
			});
			
		},
		methods: {
			
			getData(flag) {
				var that = this
				if (flag == 2) {
					this.$api.getHelpCenterInfo({
						biz_id: this.id
					}).then(res => {
					
						that.detailContents = res.data
					})
				}else{
					this.$api.getRewardRules().then(res => {
						that.detailContents = res.data
					
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
		// background-color: $uni-bg-color;

		.content-info {
			width: 100%;
			padding: 80rpx 60rpx;
			box-sizing: border-box;
			height: fit-content;
			background-color: #fff;
		}
	}
</style>