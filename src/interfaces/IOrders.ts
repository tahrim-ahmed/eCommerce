import * as BSON from 'bson'
import {IProduct} from "src/interfaces/IProduct";

export interface IOrders{
	_id?: BSON.ObjectID
	orderNumber: string
	customer: BSON.ObjectId
	products: Array<IProduct>
	quantity: number
	price: number
	paymentStatus: boolean
	isDelivered: boolean
	date: Date
	transactionID: string
	isReceived: boolean
	rating: number
	notify? : boolean
}
