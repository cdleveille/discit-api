export const log = {
	info: (msg: any, msg2?: any) => console.info(msg, msg2 ? msg2 : ""),
	error: (msg: any, msg2?: any) => console.error(msg, msg2 ? msg2 : ""),
	query: (msg: string) => logQuery(msg)
};

const logQuery = (msg: string) => {
	console.info(msg.replace(/%/g, "\\%"));
};
