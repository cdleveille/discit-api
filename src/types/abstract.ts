export interface IConfig {
	IS_PROD: boolean;
	PORT: number;
	REFRESH_DISCS_START: boolean;
	REFRESH_DISCS_CRON: boolean;
	MONGO_URI: string;
	JWT_SECRET: string;
	JWT_EXPIRATION: string;
	API_KEY: string;
}

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

export interface IError {
	code: number;
	data: any;
}
