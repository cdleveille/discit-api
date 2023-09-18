import { t } from "elysia";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

import { CategoryMap, ID_HASH_NAMESPACE, IDisc, IError, StabilityMap } from "@types";

export const discMeetsMinCriteria = (disc: IDisc) =>
	disc.id &&
	disc.name &&
	disc.brand &&
	disc.category &&
	disc.speed &&
	disc.glide &&
	disc.turn &&
	disc.fade &&
	disc.stability;

export const slugify = (text: string) =>
	text
		.toLowerCase()
		.replace(/[/\\#,+()$~%!@^|`.'":;*?<>{}[\]]/g, "")
		.replace(/[ ]/g, "-");

export const regexify = (field: string) => ({ $regex: field, $options: "i" });

export const hashString = (toHash: string) => uuidv5(toHash, ID_HASH_NAMESPACE);

export const writeDataToFile = async (data: any, path: string) => await Bun.write(path, JSON.stringify(data));

export const parseCategory = (category: string) => CategoryMap.get(category) || category;

export const parseStability = (element: any, turn: string, fade: string) => {
	if (element) {
		const classes: string = element.parentNode.parentNode.parentNode.className;
		const classesSplit = classes.split(" ");

		// check for stability via class name in html
		for (let i = classesSplit.length - 1; i >= 0; i--) {
			const stability = classesSplit[i];
			if (Array.from(StabilityMap.keys()).includes(stability)) return StabilityMap.get(stability);
		}
	}

	// if not found in html, calculate it based on turn and fade
	const diff = parseFloat(turn) + parseFloat(fade);
	switch (true) {
		case diff >= 4:
			return "Very Overstable";
		case diff >= 2 && diff < 4:
			return "Overstable";
		case diff < 2 && diff > -2:
			return "Stable";
		case diff <= -2 && diff > -4:
			return "Understable";
		case diff <= -4:
			return "Very Understable";
		default:
			return null;
	}
};

export const parseDecimalString = (decimal: string) => {
	if (decimal.startsWith(".") || decimal.startsWith("-.")) {
		return decimal.replace(".", "0.");
	}
	return decimal;
};

export const newId = () => uuidv4();

export const isAlphaNumeric = (str: string): boolean => {
	let code: number, i: number, len: number;
	for (i = 0, len = str.length; i < len; i++) {
		code = str.charCodeAt(i);
		if (
			!(code > 47 && code < 58) && // numeric (0-9)
			!(code > 64 && code < 91) && // upper alpha (A-Z)
			!(code > 96 && code < 123)
		) {
			// lower alpha (a-z)
			return false;
		}
	}
	return true;
};

export const projection = { _id: 0, created_at: 0, updated_at: 0, __v: 0 };

export const errorResponse = (set: { status?: number }, error: IError) => {
	set.status = error?.code ?? 500;
	return { error: error?.data ?? "Internal server error." };
};

export const discRequestSchema = t.Object({
	id: t.Optional(t.String()),
	name: t.Optional(t.String()),
	brand: t.Optional(t.String()),
	category: t.Optional(t.String()),
	speed: t.Optional(t.String()),
	glide: t.Optional(t.String()),
	turn: t.Optional(t.String()),
	fade: t.Optional(t.String()),
	stability: t.Optional(t.String())
});

export const discResponseSchema = t.Object({
	id: t.String(),
	name: t.String(),
	brand: t.String(),
	category: t.String(),
	speed: t.String(),
	glide: t.String(),
	turn: t.String(),
	fade: t.String(),
	stability: t.String(),
	link: t.String(),
	pic: t.String(),
	name_slug: t.String(),
	brand_slug: t.String(),
	category_slug: t.String(),
	stability_slug: t.String(),
	color: t.String(),
	background_color: t.String()
});
