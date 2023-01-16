import { model, Schema } from "mongoose";

import { IUser, IUserModel } from "../types/abstract";
import { BaseSchema } from "./_base";

const UserSchema = new Schema<IUser>({
	id: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
}).add(BaseSchema);

export const User = model<IUser, IUserModel>("User", UserSchema);
