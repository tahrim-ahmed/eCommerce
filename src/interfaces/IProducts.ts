import * as BSON from 'bson'

export interface IProducts {
	_id?: BSON.ObjectId | string
	name: string
	category: string
	quantity: string
	image: string
}
