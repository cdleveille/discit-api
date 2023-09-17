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

export const PROD_URL = "https://discit-api.fly.dev";

export enum Site {
	discClass = "disc-item",
	putterClass = "pc-entry",
	idAttr = "data-id",
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

export enum Routes {
	root = "/",
	disc = "/disc",
	user = "/user",
	bag = "/bag",
	create = "/create",
	update = "/update",
	delete = "/delete",
	register = "/register",
	login = "/login",
	validate = "/validate",
	addDisc = "/add-disc",
	removeDisc = "/remove-disc"
}

export const ID_HASH_NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";
