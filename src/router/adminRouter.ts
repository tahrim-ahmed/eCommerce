import {RouteConfig} from 'vue-router';

export const adminRoutes: RouteConfig[] = [
	{
		meta: {
			isAdmin: true
		},
		path: '',
		name: 'adminHome',
		component: () => import('pages/admin/Dashboard.vue')
	},
	{
		meta: {
			isAdmin: true
		},
		path: 'products/categories',
		name: 'productsCategories',
		component: () => import('pages/admin/ProductsCategories.vue')
	},
	{
		path: 'newUser',
		name: 'newAdminUser',
		component: () => import('pages/admin/NewUser.vue')
	}, {
		meta: {
			isAdmin: true
		},
		path: 'products',
		name: 'products',
		component: () => import('pages/admin/Products.vue')
	},{
		meta: {
			isAdmin: true
		},
		path: 'customer',
		name: 'customer',
		component: () => import('pages/admin/Customer.vue')
	},
]
