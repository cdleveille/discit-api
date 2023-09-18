import { Elysia } from "elysia";

import { errorResponse, isAlphaNumeric, newId, Password, projection } from "@helpers";
import { User } from "@models";
import { IUser } from "@types";

export const initUserRoutes = (app: Elysia) => {
	app.get("/user", async ({ set }) => {
		try {
			return await User.find({}, { ...projection, password: 0 });
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	app.get("/user/:id", async ({ set, params }) => {
		try {
			const { id } = params as Record<string, string>;
			const user = await User.findOne({ id }, { ...projection, password: 0 });
			if (!user) throw { code: 404, data: "User not found." };
			return user;
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	// @ts-ignore
	app.post("/user/login", async ({ set, body, jwt }) => {
		try {
			const { username, password } = body as IUser;
			if (!username || !password) throw { code: 400, data: "Required body fields: username, password" };

			const user = await User.findOne({ username });
			const passwordMatch = await Password.compare(password, user?.password ?? "");
			if (!user || !passwordMatch) throw { code: 400, data: "Invalid username or password." };

			const token = await jwt.sign({ id: user.id });
			return { token };
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	// @ts-ignore
	app.post("/user/register", async ({ set, body, jwt }) => {
		try {
			const { username, password } = body as IUser;
			if (!username || !password) throw { code: 400, data: "Required body fields: username, password" };
			if (!isAlphaNumeric(username)) throw { code: 400, data: "Username must be alphanumeric only." };
			if (username.length < 3) throw { code: 400, data: "Username must be at least 3 characters." };
			if (username.length > 16) throw { code: 400, data: "Username must be no more than 16 characters." };
			if (password.length < 8) throw { code: 400, data: "Password must be at least 8 characters." };
			if (await User.findOne({ username })) throw { code: 400, data: "Username not available." };

			const user = await User.create({
				id: newId(),
				username,
				password: await Password.hash(password)
			});

			const token = await jwt.sign({ id: user.id });
			return { token };
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	// @ts-ignore
	app.post("/user/validate", async ({ set, request, jwt }) => {
		try {
			const tokenPrefix = "Bearer ";
			const bearerToken = request.headers.get("Authorization");
			if (bearerToken?.slice(0, tokenPrefix.length) !== tokenPrefix)
				throw { code: 401, data: "Invalid authorization method. Bearer token expected." };
			const token = bearerToken.slice(tokenPrefix.length);
			const auth = await jwt.verify(token);
			if (!auth) throw { code: 401, data: "Invalid token." };
			const { id, username } = await User.findOne({ id: auth.id });
			return { id, username };
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	// @ts-ignore
	app.put("/user/update/username", async ({ set, body, jwt }) => {
		try {
			const { id, username, password } = body as IUser;
			if (!id || !username || !password)
				throw { code: 400, data: "Required body fields: id, username, password" };

			const user = await User.findOne({ id });
			if (!user) throw { code: 404, data: "User not found." };

			if (!isAlphaNumeric(username)) throw { code: 400, data: "Username must be alphanumeric only." };
			if (username.length < 3) throw { code: 400, data: "Username must be at least 3 characters." };
			if (username.length > 16) throw { code: 400, data: "Username must be no more than 16 characters." };
			if (await User.findOne({ username })) throw { code: 400, data: "Username not available." };

			const passwordMatch = await Password.compare(password, user.password);
			if (!passwordMatch) throw { code: 400, data: "Invalid password." };

			await User.updateOne({ id }, { username, updated_at: Date.now() });

			const token = await jwt.sign({ id });
			return { token };
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	// @ts-ignore
	app.put("/user/update/password", async ({ set, body, jwt }) => {
		try {
			const { id, newPassword, password } = body as IUser & { newPassword: string };
			if (!id || !newPassword || !password)
				throw { code: 400, data: "Required body fields: id, newPassword, password" };

			const user = await User.findOne({ id });
			if (!user) throw { code: 404, data: "User not found." };

			if (newPassword.length < 8) throw { code: 400, data: "New password must be at least 8 characters." };

			const passwordMatch = await Password.compare(password, user.password);
			if (!passwordMatch) throw { code: 400, data: "Invalid password." };

			await User.updateOne({ id }, { password: await Password.hash(newPassword), updated_at: Date.now() });

			const token = await jwt.sign({ id });
			return { token };
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	// @ts-ignore
	app.delete("/user/delete", async ({ set, body }) => {
		try {
			const { id, password } = body as IUser;
			if (!id || !password) throw { code: 400, data: "Required body fields: id, password" };

			const user = await User.findOne({ id });
			if (!user) throw { code: 404, data: "User not found." };

			const passwordMatch = await Password.compare(password, user.password);
			if (!passwordMatch) throw { code: 400, data: "Invalid password." };

			await User.deleteOne({ id });
			return { id, username: user.username };
		} catch (error) {
			return errorResponse(set, error);
		}
	});
};
