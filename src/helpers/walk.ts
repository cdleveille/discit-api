import cpx from "cpx";
import fs from "fs";
import path from "path";

import log from "../services/log";

try {
	cpx.copySync(path.join(process.cwd(), "/src/public/**/!(ts)/*"), path.join(process.cwd(), "/build/public"));

	if (fs.existsSync(path.join(process.cwd(), "/build/public/ts"))) {
		if (fs.existsSync(path.join(process.cwd(), "/build/public/js"))) {
			fs.rmSync(path.join(process.cwd(), "/build/public/js"), { recursive: true });
		}

		fs.renameSync(path.join(process.cwd(), "/build/public/ts"), path.join(process.cwd(), "/build/public/js"));
	}

	cpx.copySync(path.join(process.cwd(), "/build/public/**/!(js)/*"), path.join(process.cwd(), "/build/public.min"));
} catch (error) {
	log.error(error);
}