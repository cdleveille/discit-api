export const slugify = (text: string): string => {
	let slug = text.toLowerCase()
		.replace(/[/\\#,+()$~%!@^|`.'":;*?<>{}[\]]/g, "")
		.replace(/[ ]/g, "-");
	return slug;
};

export const request = (method: string, uri: string, headers: any, body: any): Promise<any> => {
	return new Promise((resolve, reject) => {
		fetch(uri, { method, headers, body }
		).then(r => r.json()).then(data => {
			return resolve(data);
		}).catch(e => {
			return reject(e);
		});
	});
};