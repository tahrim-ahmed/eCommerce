import * as BSON from 'bson'

export interface IProduct {
	_id?: BSON.ObjectId | string
	name: string
	category: string
	price: number
	quantity: string
	image: string
}
