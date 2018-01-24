<template>
	<div class="view abs full overflow-hidden">
		<div class="rel full">
			<p class="tell break" v-text="words">
				不知道说什么好11111111111111111111...
			</p>
			<p class="abs generate">
				<a href="javascript:void(0);" @click="goToGenerate()">我也有话要说</a>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'view',
	data () {
		return {
			words: ''
		}
	},
	methods: {
		goToGenerate(){
			this.$router.push('/generate');
		},
		translate(){
			let words=window.location.href.split('?a=')[1].split('#')[0];
			this.words=decodeURIComponent(words);
		}
	},
	mounted(){
    this.translate();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.view {
		box-sizing: border-box;
		padding: 3rem 0.5rem 0;
	}
	p.tell {
		font-size: 0.6rem;
		line-height: 1.4em;
	}
	p.generate {
		width: 100%;
		bottom: 0.5rem;
	}
	p.generate a {
		font-size: 0.3rem;
		color: #aaa;
		text-decoration: underline;
	}
</style>
