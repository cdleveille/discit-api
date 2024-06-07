import { model, Schema } from "mongoose";

import { BaseSchema, newId } from "@helpers";
import { IFiltersEnabled, IUser } from "@types";

const UserSchema = new Schema<IUser>({
	id: {
		type: String,
		required: false,
		default: () => newId()
	},
	settings: new Schema<IFiltersEnabled>({
		name: {
			type: Boolean,
			default: true
		},
		brand: {
			type: Boolean,
			default: true
		},
		category: {
			type: Boolean,
			default: true
		},
		stability: {
			type: Boolean,
			default: true
		},
		speed: {
			type: Boolean,
			default: false
		},
		glide: {
			type: Boolean,
			default: false
		},
		turn: {
			type: Boolean,
			default: false
		},
		fade: {
			type: Boolean,
			default: false
		}
	})
}).add(BaseSchema);

export const User = model<IUser>("Bag", UserSchema);
