import Vue from 'vue'
import Router from 'vue-router'
import View from '@/pages/view'
import Generate from '@/pages/generate'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'view',
			component: View
		},{
			path: '/generate',
			name: 'generate',
			component: Generate
		}
	]
})
