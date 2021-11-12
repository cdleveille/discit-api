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
	["Distance Drivers", "Distance Driver"],
	["Hybrid Drivers", "Hybrid Driver"],
	["Control Drivers", "Control Driver"],
	["Midrange Drivers", "Midrange"],
	["Putters", "Putter"]
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