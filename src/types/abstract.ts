import { FilterQuery, Model, PopulateOptions, QueryOptions } from "mongoose";

export interface IBase {
	created_at: Date;
	updated_at: Date;
}

export interface IDisc {
	id: string;
	name: string;
	brand: string;
	category: string;
	speed: string;
	glide: string;
	turn: string;
	fade: string;
	stability: string;
	link: string;
	pic: string;
	name_slug: string;
	brand_slug: string;
	category_slug: string;
	stability_slug: string;
	color: string;
	background_color: string;
}

export interface IUser {
	id: string;
	username: string;
	password: string;
}

export interface IBag {
	id: string;
	name: string;
	user_id: string;
	discs: string[];
}

export interface IDiscCollections {
	discCollection: HTMLCollectionOf<Element>;
	putterCollection: HTMLCollectionOf<Element>;
}

export interface IBaseModel<T extends IBase = IBase> extends Model<T> {
	_findOne(filter?: FilterQuery<T>, options?: Options<T>, projection?: Projection): Promise<T>;
	_assertFindOne(filter?: FilterQuery<T>, options?: Options<T>, projection?: Projection): Promise<T>;
	_find(filter?: FilterQuery<T>, options?: Options<T>, projection?: Projection): Promise<T[]>;
	_assertFind(filter?: FilterQuery<T>, options?: Options<T>, projection?: Projection): Promise<T[]>;
	_createOrUpdate(doc: Partial<T>, filter?: FilterQuery<T>): Promise<T>;
	_exists(filter: FilterQuery<T>, options?: Options<T>): Promise<boolean>;
	_assertExists(filter: FilterQuery<T>, options?: Options<T>): Promise<boolean>;
	_getCount(filter: FilterQuery<T>, options?: Options<T>): Promise<number>;
	_deleteOne(filter?: FilterQuery<T>, options?: Options<T>, projection?: Projection): Promise<T>;
}

interface IDiscXt extends IBase, IDisc {}

interface IUserXt extends IBase, IUser {}

interface IBagXt extends IBase, IBag {}

export type IDiscModel = IBaseModel<IDiscXt>;

export type IUserModel = IBaseModel<IUserXt>;

export type IBagModel = IBaseModel<IBagXt>;

export type Projection = Record<string, 0 | 1>;

export interface Options<T extends IBase = IBase> extends QueryOptions {
	sort?: {
		// eslint-disable-next-line no-unused-vars
		[k in keyof Partial<T>]: 1 | -1 | number;
	};
	populate?: PopulateOptions[];
	limit?: number;
	skip?: number;
	new?: boolean;
}

export type DiscFilterRegex = { $regex: string; $options: string };
export interface IDiscFilter {
	id?: string;
	name_slug?: DiscFilterRegex;
	brand_slug?: DiscFilterRegex;
	category_slug?: DiscFilterRegex;
	stability_slug?: string;
	speed?: string;
	glide?: string;
	turn?: string;
	fade?: string;
}

export interface IResponse<T = any> {
	ok: boolean;
	status: number;
	data: T;
	error?: string;
}

export interface IError {
	status: number;
	message: string;
}

export interface IJwtPayload {
	id: string;
	username: string;
}

export interface IJWT {
	id: string;
	username: string;
	iat: string;
	exp: string;
	issued: string;
	expires: string;
}
