import * as BSON from 'bson'

export interface IProduct {
	_id?: BSON.ObjectId
	name: string
	category: string
	price: number
	quantity: number
	image: string

	[x: string]: any

	availableQuantity?: number
}
