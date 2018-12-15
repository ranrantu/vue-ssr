import { createApp } from './app';

export default context => {
	return new Promise((resolve, reject) => {
		const { app, router } = createApp();

		// 设置服务端 router 的位置
		router.push(context.url);

		// 等到 router 将可能得异步组件和钩子函数解析完
		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents();
			if (!matchedComponents.length) {
				return reject({ code: 404 });
			}

			// 对所有匹配的路由组件调用 asyncData
			Promise.all(matchedComponents.map(Component => {
				if (Component.asyncData) {
					return Component.asyncData({
						store,
						route: router.currentRoute
					});
				}
			})).then(() => {
				context.state = store.state;

				resolve(app);
			}).catch(reject);
		}, reject);
	});
}