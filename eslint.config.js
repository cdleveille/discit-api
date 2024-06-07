// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	{
		ignores: ["node_modules/"]
	},
	...tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module"
		},
		rules: {
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-var-requires": "off"
		}
	})
];
