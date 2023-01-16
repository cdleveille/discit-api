import { FilterQuery, Schema } from "mongoose";

import { IBase, IBaseModel, Options, Projection } from "../types/abstract";
import { NotFoundError } from "../types/errors";

export const BaseSchema = new Schema<IBase, IBaseModel>({
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

const statics = {
	_findOne: async function (filter?: FilterQuery<IBase>, options?: Options, projection?: Projection) {
		const doc = await this.findOne(filter, projection, options);
		if (!doc) return null;
		return doc;
	},
	_assertFindOne: async function (filter?: FilterQuery<IBase>, options?: Options, projection?: Projection) {
		const doc = await this.findOne(filter, projection, options);
		if (!doc) throw new NotFoundError(`${this.modelName} not found`);
		return doc;
	},
	_find: async function (filter?: FilterQuery<IBase>, options?: Options, projection?: Projection) {
		const docs = await this.find(filter, options, projection);
		if (docs.length <= 0) return [];
		return docs;
	},
	_assertFind: async function (filter?: FilterQuery<IBase>, options?: Options, projection?: Projection) {
		const docs = await this.find(filter, options, projection);
		if (docs.length <= 0) throw new NotFoundError(`${this.modelName}s not found`);
		return docs;
	},
	_createOrUpdate: async function (doc: Partial<IBase>, filter?: FilterQuery<IBase>) {
		if (!filter) return this.create(doc);
		const exists = await this.exists(filter);
		if (!exists) return this.create(doc);
		return this.findOneAndUpdate(filter, doc, { new: true }) as unknown as IBase;
	},
	_getCount: async function (filter: FilterQuery<IBase>, options?: Options) {
		return this.find(filter, options).count();
	},
	_exists: async function (filter: FilterQuery<IBase>, options?: Options) {
		return (await this._getCount(filter, options)) > 0;
	},
	_assertExists: async function (filter: FilterQuery<IBase>, options?: Options) {
		const count = await this._getCount(filter, options);
		if (count <= 0) throw new NotFoundError(`${this.modelName} does not exist`);
		return true;
	}
} as IBaseModel;

BaseSchema.statics = statics as unknown as typeof BaseSchema.statics;
