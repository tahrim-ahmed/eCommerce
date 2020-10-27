import * as BSON from "bson";

export interface IUser {
	_id?: BSON.ObjectId | string
	email: string
	password: string
}
