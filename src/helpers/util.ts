import { Disc } from "../models/disc";
import { IDisc } from "../types/abstract";
import { FieldsUsingLike, FieldsUsingSlug } from "../types/constants";

export const createDisc = (disc: IDisc) => {
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
		stability_slug: disc.stability_slug,
		color: disc.color,
		background_color: disc.background_color
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
		disc1.stability_slug === disc2.stability_slug &&
		disc1.color === disc2.color &&
		disc1.background_color === disc2.background_color
	);
};

export const safeUpdateDiscFromOtherDisc = (targetDisc: IDisc, sourceDisc: IDisc): IDisc => {
	sourceDisc.name && (targetDisc.name = sourceDisc.name);
	sourceDisc.brand && (targetDisc.brand = sourceDisc.brand);
	sourceDisc.category && (targetDisc.category = sourceDisc.category);
	sourceDisc.speed && (targetDisc.speed = sourceDisc.speed);
	sourceDisc.glide && (targetDisc.glide = sourceDisc.glide);
	sourceDisc.turn && (targetDisc.turn = sourceDisc.turn);
	sourceDisc.fade && (targetDisc.fade = sourceDisc.fade);
	sourceDisc.stability && (targetDisc.stability = sourceDisc.stability);
	sourceDisc.link && (targetDisc.link = sourceDisc.link);
	sourceDisc.pic && (targetDisc.pic = sourceDisc.pic);
	sourceDisc.name_slug && (targetDisc.name_slug = sourceDisc.name_slug);
	sourceDisc.brand_slug && (targetDisc.brand_slug = sourceDisc.brand_slug);
	sourceDisc.category_slug && (targetDisc.category_slug = sourceDisc.category_slug);
	sourceDisc.stability_slug && (targetDisc.stability_slug = sourceDisc.stability_slug);
	sourceDisc.color && (targetDisc.color = sourceDisc.color);
	sourceDisc.background_color && (targetDisc.background_color = sourceDisc.background_color);
	return targetDisc;
};

export const discMeetsMinCriteria = (disc: IDisc) => {
	return (
		disc.name && disc.brand && disc.category && disc.speed && disc.glide && disc.turn && disc.fade && disc.stability
	);
};

export const cleanQueryField = (key: string): string => {
	const cleanKey = key.replace(/amp;/gi, "").toLowerCase().trim();
	return FieldsUsingSlug.includes(cleanKey) ? `${cleanKey}_slug` : cleanKey;
};

export const cleanQueryValue = (cleanKey: string, value: string): any => {
	const cleanValue = value.toLowerCase().trim();
	if (FieldsUsingLike.includes(cleanKey)) {
		return { $ilike: `%${cleanValue}%` };
	} else {
		return `${cleanValue}`;
	}
};

export const slugify = (text: string): string => {
	const slug = text
		.toLowerCase()
		.replace(/[/\\#,+()$~%!@^|`.'":;*?<>{}[\]]/g, "")
		.replace(/[ ]/g, "-");
	return slug;
};

export const regexify = (field: string) => {
	return { $regex: field, $options: "i" };
};
