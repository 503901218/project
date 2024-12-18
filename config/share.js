export default{
	data(){
		return {
			//设置默认的分享参数
			share:{
				title:'曌卿欣酒业商城',
				path:'pages/index/index',
				imageUrl:'https://zhaoqingxin-1332179843.cos.ap-chengdu.myqcloud.com/zhaoqingxin/zqx_share_img.png',
				desc:'',
				content:''
			}
		}
	},
	onShareAppMessage(res) {
		return {
			title:this.share.title,
			path:this.share.path,
			imageUrl:this.share.imageUrl,
			desc:this.share.desc,
			content:this.share.content,
			success(res){
				uni.showToast({
					title:'分享成功'
				})
			},
			fail(res){
				uni.showToast({
					title:'分享失败',
					icon:'none'
				})
			}
		}
	}
}