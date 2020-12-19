import {boot} from "quasar/wrappers";
import *  as  Realm from 'realm-web'
import {Loading} from "quasar";
import {UserType} from "src/interfaces/util";

export default boot(async ({Vue, router, store}) => {
	let client = Vue.prototype.$realm = new Realm.App({id: 'application-0-ybepu'})

	router.beforeEach((to, from, next) => {
		store.commit("setCurrentUser", client.currentUser.customData)
		store.commit("setIsLoggedIn", !client.currentUser.identities.map(value => value.providerType).includes("anon-user"))
		Loading.show()
		if (!client.currentUser) {
			client.logIn(Realm.Credentials.anonymous())
		}
		Vue.prototype.$db = client.currentUser.mongoClient('mongodb-atlas').db('ecommerce')
		if (to.meta.isAdmin) {
			if (client.currentUser.customData.userType != UserType.ADMIN) {
				router.push({name: 'home'})
			} else {
				next()
			}
		} else {
			if (to.meta.isCustomer) {
				if (client.currentUser.customData.userType != UserType.CUSTOMER) {
					router.push({name: 'home'})
				} else {
					next()
				}
			} else {
				next()
			}
		}

		/*if (to.meta.isAdmin) {
			if (!client.currentUser) {
				client.logIn(Realm.Credentials.anonymous())
				Vue.prototype.$db = client.currentUser.mongoClient('mongodb-atlas').db('ecommerce')
				router.push({name: 'adminLogIn'})
			} else {
				Vue.prototype.$db = client.currentUser.mongoClient('mongodb-atlas').db('ecommerce')
				next()
			}
		} else {
			if (to.name === 'adminLogIn' && client.currentUser) {
				Vue.prototype.$db = client.currentUser.mongoClient('mongodb-atlas').db('ecommerce')
				router.push({name: 'adminHome'})
			} else {
				client.logIn(Realm.Credentials.anonymous())
				Vue.prototype.$db = client.currentUser.mongoClient('mongodb-atlas').db('ecommerce')
				next()
			}
		}*/
	})

	router.afterEach(to => {
		Loading.hide()
	})
})
