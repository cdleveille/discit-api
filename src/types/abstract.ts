import type * as shared from "discit-types";

export type IDisc = shared.Disc;
export type IBag = shared.Bag;
export type ApiError = shared.ApiError;

export interface IConfig {
	IS_PROD: boolean;
	PORT: number;
	MONGO_URI: string;
	API_KEY: string;
}

export interface IBase {
	created_at: Date;
	updated_at: Date;
}

export type Projection = Record<string, 0 | 1>;

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
