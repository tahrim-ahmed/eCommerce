import {RouteConfig} from 'vue-router';
import {adminRoutes} from "src/router/adminRouter";

const routes: RouteConfig[] = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{path: '', component: () => import('pages/Index.vue')}
		]
	}, {
		path: '/admin',
		component: () => import('layouts/AdminLayout.vue'),
		children: adminRoutes
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '*',
		component: () => import('pages/Error404.vue')
	}
];

export default routes;
