import fs from "fs";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

import log from "../services/log";
import { IDisc } from "../types/abstract";
import { CategoryMap, ID_HASH_NAMESPACE, StabilityMap } from "../types/constants";

export const discMeetsMinCriteria = (disc: IDisc) => {
	return (
		disc.id &&
		disc.name &&
		disc.brand &&
		disc.category &&
		disc.speed &&
		disc.glide &&
		disc.turn &&
		disc.fade &&
		disc.stability
	);
};

export const slugify = (text: string) => {
	const slug = text
		.toLowerCase()
		.replace(/[/\\#,+()$~%!@^|`.'":;*?<>{}[\]]/g, "")
		.replace(/[ ]/g, "-");
	return slug;
};

export const regexify = (field: string) => {
	return { $regex: field, $options: "i" };
};

export const hashString = (toHash: string) => {
	return uuidv5(toHash, ID_HASH_NAMESPACE);
};

export const writeDataToFile = (data: any, path: string) => {
	try {
		fs.writeFileSync(path, JSON.stringify(data));
	} catch (error) {
		log.error(error);
	}
};

export const parseCategory = (category: string) => {
	return CategoryMap.get(category) || category;
};

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

export const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");

export const validateEmail = (email: string) => {
	return email.includes("@") && email.includes(".");
};
