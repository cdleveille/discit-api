import { model, Schema } from "mongoose";

import { IBag, IBagModel } from "../types/abstract";
import { BaseSchema } from "./_base";

const BagSchema = new Schema<IBag>({
	id: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	user_id: {
		type: String,
		required: true
	},
	discs: {
		type: [
			{
				type: String
			}
		],
		required: false,
		default: []
	}
}).add(BaseSchema);

export const Bag = model<IBag, IBagModel>("Bag", BagSchema);
