export const log = {
	info: (...msgs: any[]) => console.info(...msgs),
	error: (...msgs: any[]) => console.error(...msgs),
	query: (msg: string) => logQuery(msg)
};

const logQuery = (msg: string) => {
	console.info(msg.replace(/%/g, "\\%"));
};
