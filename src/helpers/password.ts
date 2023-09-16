export class Password {
	public static async hash(pass: string) {
		try {
			return await Bun.password.hash(pass, { algorithm: "bcrypt" });
		} catch (e) {
			throw Error(e);
		}
	}

	public static async compare(pass: string, hash: string) {
		try {
			return await Bun.password.verify(pass, hash);
		} catch (e) {
			throw Error(e);
		}
	}
}
