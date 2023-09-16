import { Schema } from "mongoose";

import { IBase } from "@types";

export const BaseSchema = new Schema<IBase>({
	created_at: {
		type: Date,
		default: () => Date.now(),
		immutable: true
	},
	updated_at: {
		type: Date,
		default: () => Date.now()
	}
});
