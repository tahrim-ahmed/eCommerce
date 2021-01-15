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
		path: 'myOrders',
		name: 'myOrders',
		component: () => import('pages/customer/MyOrder.vue')
	}, {
		path: ':category/:subCategory',
		name: 'category',
		component: () => import('pages/customer/Category.vue')
	},
]
