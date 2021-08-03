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
	]
});

const app = new Vue({
	el: "#app",
	router
});