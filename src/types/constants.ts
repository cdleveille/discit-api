/* eslint-disable no-unused-vars */

export enum Env {
	dev = "development",
	prod = "production"
}

export enum Host {
	local = "localhost",
	ip = "127.0.0.1"
}

export const categoryMap = new Map([
	["Distance Drivers", "Distance Driver"],
	["Hybrid Drivers", "Hybrid Driver"],
	["Control Drivers", "Control Driver"],
	["Midrange Drivers", "Midrange"],
	["Putters", "Putter"]
]);

export const stabilityValues = [
	"very-overstable",
	"overstable",
	"stable",
	"understable",
	"very-understable"
];

export const fieldsUsingLike = [
	"name",
	"brand",
	"category"
];

export const DISC_FETCH_URL = "https://www.marshallstreetdiscgolf.com/flightguide";