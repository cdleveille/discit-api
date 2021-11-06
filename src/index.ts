import { App } from "./Services/App";

(async () => {
	try {
		await App.Start();
	} catch (error) {
		console.log(error);
		process.exit(-1);
	}
})();