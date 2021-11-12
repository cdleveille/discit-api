/* eslint-disable no-unused-vars */

export enum Env {
	dev = "development",
	prod = "production"
}

export enum Host {
	local = "localhost",
	ip = "127.0.0.1"
}

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
	putterPicAttr = "data-image"
}

export const CategoryMap = new Map([
	["Distance Drivers", "distance-driver"],
	["Hybrid Drivers", "hybrid-driver"],
	["Control Drivers", "control-driver"],
	["Midrange Drivers", "midrange"],
	["Putters", "putter"]
]);

export const StabilityValues = [
	"very-overstable",
	"overstable",
	"stable",
	"understable",
	"very-understable"
];

export const FieldsUsingLike = [
	"name",
	"brand",
	"category"
];

export const DISC_FETCH_URL = "https://www.marshallstreetdiscgolf.com/flightguide";