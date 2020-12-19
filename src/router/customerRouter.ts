import {RouteConfig} from 'vue-router';

export const customerRoutes: RouteConfig[] = [
	{
		meta: {
			isCustomer: true
		},
		path: '',
		name: 'customerHome',
		component: () => import('pages/customer/Dashboard.vue')
	}, {
		path: 'checkout',
		name: 'checkout',
		component: () => import('pages/customer/Checkout.vue')
	}, {
		path: 'orders',
		name: 'orders',
		component: () => import('pages/customer/Orders.vue')
	},
]
