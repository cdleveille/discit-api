const log = {
	info: (msg: any, msg2?: any) => console.log(msg, msg2 ? msg2 : ""),
	error: (msg: any, msg2?: any) => console.error(msg, msg2 ? msg2 : "")
};

export default log;