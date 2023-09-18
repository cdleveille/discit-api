import { model, Schema } from "mongoose";

import { BaseSchema, newId } from "@helpers";
import { IUser } from "@types";

const UserSchema = new Schema<IUser>({
	id: {
		type: String,
		required: false,
		default: newId()
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
}).add(BaseSchema);

export const User = model<IUser>("User", UserSchema);
