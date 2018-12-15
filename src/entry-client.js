import { createApp } from './app';

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
	store.replaceSate(window.__INITIAL_STATE__);
}

router.onReady(() => {
	router.beforeResolve((to, from, next) => {
		const matched = router.getMatchedComponents(to);
		const prevMatched = router.getMatchedComponents(from);

		let diffed = false;
		const activated = matched.filter((c, i) => {
			return diffed || (diffed = (prevMatched[i] !== c));
		});

		if (!activated.length) {
			return next();
		}

		// loading

		Promise.all(activated.map(c => {
			if (c.asyncData) {
				return c.asyncData({ store, route: to });
			}
		})).then(() => {

			// 停止加载
			next();
		}).catch(next);
	});
	app.$mount('#app');
});
