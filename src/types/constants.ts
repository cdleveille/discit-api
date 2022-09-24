/* eslint-disable no-unused-vars */

export enum Env {
	dev = "development",
	prod = "production"
}

export enum Host {
	local = "localhost",
	ip = "127.0.0.1"
}

export const DISC_FETCH_URL = "https://www.marshallstreetdiscgolf.com/flightguide";

export const PROD_URL = "https://discitapi.herokuapp.com";

export enum Site {
	discClass = "disc-item",
	putterClass = "pc-entry",
	discNameAttr = "data-title",
	putterNameAttr = "data-putter",
	brandAttr = "data-brand",
	categoryAttr = "data-category",
	speedAttr = "data-speed",
	glideAttr = "data-glide",
	turnAttr = "data-turn",
	fadeAttr = "data-fade",
	linkAttr = "data-link",
	discPicAttr = "data-pic",
	putterPicAttr = "data-image",
	colorAttr = "data-text",
	backgroundColorAttr = "data-bg"
}

export const CategoryMap = new Map([
	["Distance Drivers", "Distance Driver"],
	["Hybrid Drivers", "Hybrid Driver"],
	["Control Drivers", "Control Driver"],
	["Midrange Drivers", "Midrange"],
	["Putters", "Putter"]
]);

export const StabilityMap = new Map([
	["very-overstable", "Very Overstable"],
	["overstable", "Overstable"],
	["stable", "Stable"],
	["understable", "Understable"],
	["very-understable", "Very Understable"]
]);

export const FieldsUsingLike = [
	"name_slug",
	"brand_slug",
	"category_slug",
	"name",
	"brand",
	"category"
];

export const FieldsUsingSlug = [
	"name",
	"brand",
	"category",
	"stability"
];

export const FieldTypos = new Map([
	["disc", ["idsc", "dsic", "dics", "disk", "disks", "dissk", "discs", "dissc", "dsci"]],
	["name", ["anme", "nmae", "naem", "names", "namse", "mold", "omld", "modl", "molds", "molsd", "mlod", "mldo"]],
	["brand", ["rband", "barnd", "brnad", "bradn", "brands", "bransd", "manufacturer"]],
	["category", ["actegory", "ctaegory", "caetgory", "catgeory", "cateogry", "categroy", "categoyr", "categories", "type", "ytpe", "tpye", "tyep", "types", "typse"]],
	["speed", ["pseed", "seped", "spede", "speeds", "speesd"]],
	["glide", ["lgide", "gilde", "gldie", "glied", "glides", "glidse"]],
	["turn", ["utrn", "trun", "tunr", "turns", "tursn"]],
	["fade", ["afde", "fdae", "faed", "fades", "fadse", "face"]],
	["stability", ["tsability", "satbility", "stbaility", "staiblity", "stabliity", "stabiilty", "stabiltiy", "stabiliyt", "stabilities", "stabilitise"]]
]);

export enum Routes {
	root = "/",
	disc = "/disc",
	name = "/name",
	brand = "/brand",
	category = "/category",
	speed = "/speed",
	glide = "/glide",
	turn = "/turn",
	fade = "/fade",
	stability = "/stability",
}
