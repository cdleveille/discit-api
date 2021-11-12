import { Disc } from "../models/Disc";
import { IDisc } from "../types/abstract";
import { FieldsUsingLike } from "../types/constants";

export const createDisc = (disc: IDisc): Disc => {
	return new Disc({
		name: disc.name,
		brand: disc.brand,
		category: disc.category,
		speed: disc.speed,
		glide: disc.glide,
		turn: disc.turn,
		fade: disc.fade,
		stability: disc.stability,
		link: disc.link,
		pic: disc.pic
	});
};

export const discNameAndBrandMatch = (disc: IDisc, disc2: IDisc): IDisc => {
	return disc.name === disc2.name && disc.brand === disc2.brand ? disc2 : null;
};

export const discsAreEqual = (disc1: IDisc, disc2: IDisc): boolean => {
	return (
		disc1.name === disc2.name &&
		disc1.brand === disc2.brand &&
		disc1.category === disc2.category &&
		disc1.speed === disc2.speed &&
		disc1.glide === disc2.glide &&
		disc1.turn === disc2.turn &&
		disc1.fade === disc2.fade &&
		disc1.stability === disc2.stability &&
		disc1.link === disc2.link &&
		disc1.pic === disc2.pic
	);
};

export const updateDiscFromOtherDisc = (targetDisc: IDisc, sourceDisc: IDisc): IDisc => {
	targetDisc.name = sourceDisc.name;
	targetDisc.brand = sourceDisc.brand;
	targetDisc.category = sourceDisc.category;
	targetDisc.speed = sourceDisc.speed;
	targetDisc.glide = sourceDisc.glide;
	targetDisc.turn = sourceDisc.turn;
	targetDisc.fade = sourceDisc.fade;
	targetDisc.stability = sourceDisc.stability;
	targetDisc.link = sourceDisc.link;
	targetDisc.pic = sourceDisc.pic;

	return targetDisc;
};

export const equalsOrLike = (key: string, value: string): string => {
	if (FieldsUsingLike.includes(key.toLowerCase())) {
		return `${key.toLowerCase()} ilike '%${value}%'`;
	}
	return `${key} = '${value}'`;
};