<template>
	<div class="gen overflow-hidden">
		<div class="abs tips">
			<span v-text="tips"></span>
		</div>
		<div class="rel final" v-if="isFinal">
			<img class="result-img abs full" :src="resultSrc" />
		</div>
		<div class="rel bg" ref="bg" v-else>
			<div class="abs face face1" v-show="face%3==0"></div>
			<div class="abs face face2" v-show="face%3==1"></div>
			<div class="abs face face3" v-show="face%3==2"></div>
			<div class="abs rect" @click="face+=1"></div>
			<div class="title">
				想对你说的话<br>偷偷藏在二维码里
			</div>
			<div class="abs text">
				<textarea rows="5" maxlength="24" v-model="text" v-if="isTyping"></textarea>
				<img :src="src" v-else>
			</div>
		</div>
		<div class="btn-group">
			<button class="btn btn1" @click="reset()">重置</button>
			<button class="btn btn2" @click="generateSrc()" :disabled="isFinal">生成</button>
		</div>
	</div>
</template>

<script>
import qr from 'qr-image';
import html2canvas from 'html2canvas'
export default {
	name: 'generate',
	data () {
		return {
			isTyping: true,
			isFinal: false,
			text: '天冷了记得加衣服',
			tips: '点击文字编辑',
			src: '',
			face: 0,
			retryTimes: 20,
			resultSrc: ''
		}
	},
	methods: {
		reset(){
			this.tips='点击文字编辑';
			this.text='天冷了记得加衣服';
			this.isTyping = true;
			this.isFinal = false;
		},
		generateSrc(){
			let url='http://mayao.qiniudn.com/tell-u/?a='
			let text=encodeURIComponent(this.text);
			url+=text;
			let qr_svg = qr.imageSync(url, { type: 'png', margin: 1 });
			let qr_str = "data:image/png;base64," + qr_svg.toString('base64');
			this.isTyping = false;
			this.src = qr_str;
			this.retry(this.generateResult);
		},
		generateResult(){
			let bg=this.$refs.bg;
			html2canvas(bg).then((canvas)=>{
				let src=canvas.toDataURL();
				this.resultSrc=src;
				this.isFinal=true;
				this.tips='长按保存';
			})
		},
		retry(func) {
			if (this.src) {
				this.$nextTick(func);
				this.retryTimes = 0;
				return;
			}
			if (this.retryTimes > 0) {
				this.retryTimes--;
				setTimeout(()=>{
					this.retry(func);
				}, 50);
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	div.gen {
		padding-top: 1.5rem;
	}
	div.tips {
		width: 2.2rem;
		height: 0.8rem;
		top: 0.4rem;
		right: 0.2rem;
		background: url(./image/tips.png);
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
		color: #fff;
		font-weight: bold;
		font-size: 0.3rem;
		padding-top: 0.1rem;
	}
	div.final {
		width: 7rem;
		height: 7rem;
		margin-left: 0.25rem;
	}
	div.final .result-img {
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		border: none;
		outline: none;
	}
	div.bg {
		width: 7rem;
		height: 7rem;
		box-sizing: border-box;
		padding-top: 0.1rem;
		margin-left: 0.25rem;
		background: url(./image/bg.jpg);
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
	}
	div.bg .rect {
		width: 2rem;
		height: 2rem;
		bottom: 0.3rem;
		left: 0.7rem;
		/*outline: 1px solid red;*/
		z-index: 3;
	}
	div.bg .face {
		width: 100%;
		height: 100%;
		z-index: 2;
	}
	div.bg .face1 {
		background: url(./image/face1.png);
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
	}
	div.bg .face2 {
		background: url(./image/face2.png);
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
	}
	div.bg .face3 {
		background: url(./image/face3.png);
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
	}
	div.bg .title {
		font-size: 0.8rem;
		font-weight: bold;
		color: #111;
	}
	div.bg .text {
		width: 3.1rem;
		height: 3.1rem;
		right: 0.35rem;
		top: 2.65rem;
		text-align: left;
		/*outline: red 1px solid;*/
		z-index: 3;
	}
	div.bg .text textarea {
		display: block;
		width: 3.05rem;
		height: 3.05rem;
		border: none;
		resize: none;
		/*outline: green 1px solid;*/
		font-size: 0.6rem;
		font-family: '黑体','Heiti',system;
	}
	div.bg .text img {
		display: block;
		width: 3.1rem;
		height: 3.1rem;
	}
	.btn-group {
		margin-top: 0.5rem;
	}
	.btn-group button{
		font-size: 0.4rem;
		padding: 0.05rem 0.4rem 0.08rem;
		color: #fff;
		border: none;
		outline: none;
		border-radius: 0.1rem;
	}
	.btn-group .btn1{
		background: #26c;
	}
	.btn-group .btn2{
		background: #e90;
		margin-left: 0.4rem;
	}
	.btn-group .btn:disabled{
		background: #ccc;
	}
</style>
