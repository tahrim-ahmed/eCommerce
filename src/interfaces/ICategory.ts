import * as BSON from 'bson'

export interface ICategory {
	_id?: string
	name: string
	parent: BSON.ObjectId
}
