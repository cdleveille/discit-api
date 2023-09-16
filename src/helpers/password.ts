import bcrypt from "bcrypt";

export class Password {
	public static async hash(string: string) {
		try {
			const salt: string = await bcrypt.genSalt(12);
			const hash: string = await bcrypt.hash(string, salt);
			return hash;
		} catch (e) {
			throw Error(e);
		}
	}

	public static async compare(pass: string, hash: string) {
		try {
			return await bcrypt.compare(pass, hash);
		} catch (e) {
			throw Error(e);
		}
	}
}
