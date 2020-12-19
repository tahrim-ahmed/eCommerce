import {boot} from 'quasar/wrappers';
import qrow from "components/qrow.vue";
import qcol from "components/qcol.vue";
import firebase from "firebase/app";
import *  as  RealmWeb from 'realm-web'
import MongoDBDatabase = Realm.Services.MongoDBDatabase;

export default boot(({Vue}) => {
	Vue.component('QRow', qrow)
	Vue.component('QCol', qcol)
	Vue.prototype.$common = {
		rules: {
			required(v: any) {
				return v.length || 'Field is Required!'
			},
			number(v: any) {
				return !isNaN(v) || 'Field is Required!'
			}
		}
	}
});


declare module 'vue/types/vue' {

	interface Vue {
		$storage: firebase.storage.Reference,
		$realm: RealmWeb.App,
		$db: MongoDBDatabase,
		$common: {
			rules: {
				required(v: any): true | String,
				number(v: any):true | number
			}
		}
	}
}
