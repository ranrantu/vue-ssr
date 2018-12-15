import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';

export function createApp () {
	// create router instance
	const router = createRouter();
	const store = createStore();

	// 同步路由状态(route state)到 store
	sync(store, router);

	const app = new Vue({
		// inject router to roote Vue instance
		router,
		store,
		render: h => h(App)
	});

	// export app, router and store
	return { app, router, store };
}