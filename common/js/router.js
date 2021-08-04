/*
 * router.js
 */

const router = new VueRouter({
	//mode: 'history',
	routes: [
		{ path: '/index.html', component: httpVueLoader('./vue/index.vue') },
		{ path: '/', component: httpVueLoader('./vue/index.vue') },
		{ path: '/memo-btn.html', component: httpVueLoader('./vue/memo-btn.vue') },
		{ path: '/memo-btn-velocity.html', component: httpVueLoader('./vue/memo-btn-velocity.vue') },
		{ path: '/memo-pointer-obj.html', component: httpVueLoader('./vue/memo-pointer-obj.vue') },
		{ path: '/memo-bootstrap.html', component: httpVueLoader('./vue/memo-bootstrap.vue') },

		
	]
});

const app = new Vue({
	el: "#app",
	router
});