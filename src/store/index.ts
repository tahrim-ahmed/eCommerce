import {store} from 'quasar/wrappers';
import Vuex from 'vuex';
import {IProduct} from "src/interfaces/IProduct";
import {LocalStorage} from "quasar";
import {IUser} from "src/interfaces/IUser";
import {INewUser} from "src/interfaces/INewUser";


export interface StateInterface {
	currentUser: INewUser
	isLoggedIn: boolean
	cartItems: IProduct[];
}

export default store(function ({Vue}) {
	Vue.use(Vuex);

	const Store = new Vuex.Store<StateInterface>({
		modules: {
			// example
		},
		mutations: {
			setItems: (state, items) => {
				state.cartItems = items
			},
			incrementItemQuantity: (state, item: IProduct) => {
				let index = state.cartItems.findIndex((i: IProduct) => i._id === item._id)
				state.cartItems[index].quantity++
			}, decrementItemQuantity: (state, item: IProduct) => {
				let index = state.cartItems.findIndex((i: IProduct) => i._id === item._id)
				state.cartItems[index].quantity--
			},
			clearCart: (state) => {
				state.cartItems = []
				LocalStorage.set('cartItems', [])
			},
			setCurrentUser: (state, user) => {
				state.currentUser = user
			},
			setIsLoggedIn: (state, val) => {
				state.isLoggedIn = val
			}
		},
		state: {
			cartItems: LocalStorage.getItem<Array<IProduct>>('cartItems') || [],
			currentUser: null,
			isLoggedIn: false
		},
		getters: {
			cartItems: (state) => state.cartItems,
			isLoggedIn: (state) => state.isLoggedIn,
			currentUser: (state) => state.currentUser,
		},
		strict: !!process.env.DEBUGGING
	});

	return Store;
});
