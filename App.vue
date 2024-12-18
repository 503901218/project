<script>
	import {
		provide,
		inject
	} from 'vue';
	export default {
		provide() {
			return {
				// login: this.login
				login: () => {
					return new Promise((resolve, reject) => {
						var that = this
						
						if (this.$store.sessionId&&this.$store.userInfo.distributor_code) {
							resolve(true)

						} else {
							this.login().then(res => {
								resolve(res)
							})
						}
					})
				}
			}
		},
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods: {
			login() {
				var that = this
				return new Promise((resolve, reject) => {
					// 执行第一个方法的逻辑
					uni.login({
						provider: 'weixin', //使用微信登录
						success: function(loginRes) {

							that.$api.miniJscodeToSession({
								js_code: loginRes.code
							}).then(res => {
								
								if (res.code) {
									
									that.$store.getSessionId(res.data.user_info
										.session_id)
									that.$store.getUserId(res.data.user_id)
									that.$store.getUserInfo(res.data.user_info)	
									
									resolve(res);

								}
							})
						}
					});

				})

			},
		}

	}
</script>

<style>
	/*每个页面公共css */
	@import 'static/main.css';
	/* html,body {
			font-size: calc(100vw / 43);
		} */
</style>