import { model, Schema } from "mongoose";

import { BaseSchema, newId } from "@helpers";
import { IBag } from "@types";

const BagSchema = new Schema<IBag>({
	id: {
		type: String,
		required: false,
		default: newId()
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

export const Bag = model<IBag>("Bag", BagSchema);
