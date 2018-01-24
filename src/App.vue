<template>
  <div id="app" class="full">
    <router-view/>
  </div>
</template>

<script>
import FastClick from 'fastclick';
FastClick.attach(document.body);
export default {
  name: 'app',
  watch: {
		$route(to,from){
			window.weixinShare && window.weixinShare.shareDeny();
		}
	},
  mounted: function(){
    window.weixinShare && window.weixinShare.shareDeny();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
