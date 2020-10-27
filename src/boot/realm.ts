import {boot} from "quasar/wrappers";
import *  as  Realm from 'realm-web'
import {Loading} from "quasar";

export default boot(async ({Vue, router}) => {
	let client = Vue.prototype.$realm = new Realm.App({id: 'application-0-ybepu'})
	router.beforeEach((to, from, next) => {
		Loading.show()
		if (to.meta.isAdmin) {
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
		}
	})

	router.afterEach(to => {
		Loading.hide()
	})
})
