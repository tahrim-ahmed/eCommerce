import {boot} from "quasar/wrappers";
import firebase from "firebase/app";
import 'firebase/storage'

export default boot(async ({Vue}) => {
	const firebaseConfig = {
		apiKey: "AIzaSyCNBWTI0XYhbYpE1MUrMzdcOKhOtLdRsqA",
		authDomain: "commerce-649e2.firebaseapp.com",
		databaseURL: "https://commerce-649e2.firebaseio.com",
		projectId: "commerce-649e2",
		storageBucket: "commerce-649e2.appspot.com",
		messagingSenderId: "196177150354",
		appId: "1:196177150354:web:bd3c7ced6f9d0d8441014b",
		measurementId: "G-Z0WNNKZLR5"
	}
	firebase.initializeApp(firebaseConfig)
	Vue.prototype.$storage=firebase.storage().refFromURL('gs://commerce-649e2.appspot.com')
})
