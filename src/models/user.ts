import { model, Schema } from "mongoose";

import { BaseSchema } from "@models";
import { IUser } from "@types";

const UserSchema = new Schema<IUser>({
	id: {
		type: String,
		required: true
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
