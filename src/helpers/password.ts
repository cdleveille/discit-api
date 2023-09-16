export const Password = {
	hash: async (pass: string) => await Bun.password.hash(pass, { algorithm: "bcrypt" }),
	compare: async (pass: string, hash: string) => await Bun.password.verify(pass, hash)
};
