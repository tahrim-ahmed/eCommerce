import * as BSON from "bson";
import {UserType} from "src/interfaces/util";

export interface INewUser {
	_id?: BSON.ObjectId | string
	firstName: string
	lastName: string
	contact: string
	address: string
	email: string
	password: string
	userID: string
	userType: UserType
}
