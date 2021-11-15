import { Disc } from "../models/Disc";
import { IDisc } from "../types/abstract";
import { FieldsUsingLike, FieldsUsingSlug } from "../types/constants";

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
		pic: disc.pic,
		name_slug: disc.name_slug,
		brand_slug: disc.brand_slug,
		category_slug: disc.category_slug,
		stability_slug: disc.stability_slug
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
		disc1.pic === disc2.pic &&
		disc1.name_slug === disc2.name_slug &&
		disc1.brand_slug === disc2.brand_slug &&
		disc1.category_slug === disc2.category_slug &&
		disc1.stability_slug === disc2.stability_slug
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
	targetDisc.name_slug = sourceDisc.name_slug;
	targetDisc.brand_slug = sourceDisc.brand_slug;
	targetDisc.category_slug = sourceDisc.category_slug;
	targetDisc.stability_slug = sourceDisc.stability_slug;

	return targetDisc;
};

export const slugify = (text: string) => {
	let slug = text.toLowerCase();
	slug = slug.replace(/[/\\#,+()$~%!@^|`.'":;*?<>{}[\]]/g, "");
	slug = slug.replace(/[ ]/g, "-");
	return slug;
};

export const cleanQueryField = (key: string): string => {
	const cleanKey = key.replace(/amp;/gi, "").toLowerCase().trim();
	return FieldsUsingSlug.includes(cleanKey) ? `${cleanKey}_slug` : cleanKey;
};

export const cleanQueryValue = (cleanKey: string, value: string): any => {
	const cleanValue = value.toLowerCase().trim();
	if (FieldsUsingLike.includes(cleanKey)) {
		return { "$ilike": `%${cleanValue}%` };
	} else {
		return `${cleanValue}`;
	}
};