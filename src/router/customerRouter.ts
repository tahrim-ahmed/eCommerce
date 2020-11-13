import {RouteConfig} from 'vue-router';

export const customerRoutes: RouteConfig[] = [
	{
		meta: {
			isAdmin: true
		},
		path: '',
		name: 'customerHome',
		component: () => import('pages/customer/Dashboard.vue')
	}, {
		path: 'login',
		name: 'customerLogIn',
		component: () => import('pages/customer/Login.vue')
	},
]
