import {RouteConfig} from 'vue-router';
import {adminRoutes} from "src/router/adminRouter";
import {customerRoutes} from "src/router/customerRouter";

const routes: RouteConfig[] = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{path: '', name: 'home', component: () => import('pages/Index.vue'),},
			{
				path: 'signup',
				name: 'signup',
				component: () => import('pages/customer/SignUp.vue')
			}, {
				path: 'login',
				name: 'login',
				component: () => import('pages/Login.vue')
			},
		]
	}, {
		path: '/admin',
		component: () => import('layouts/AdminLayout.vue'),
		children: adminRoutes
	}, {
		path: '/customer',
		component: () => import('layouts/MainLayout.vue'),
		children: customerRoutes
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '*',
		component: () => import('pages/Error404.vue')
	}
];

export default routes;
