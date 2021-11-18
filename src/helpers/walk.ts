import cpx from "cpx";
import path from "path";

import log from "../services/log";

try {
	cpx.copySync(path.join(process.cwd(), "/public/**/*"), path.join(process.cwd(), "/public.min"));
	log.info("Copied /public folder to /public.min");
} catch (error) {
	log.error(error);
}