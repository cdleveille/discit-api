import { NextFunction, Request, Response, Router } from "express";

import Jwt from "../helpers/jwt";
import { Password } from "../helpers/password";
import { isAlphaNumeric, newId } from "../helpers/util";
import { validate } from "../middleware/jwt";
import { User } from "../models/user";
import { IResponse, IUser } from "../types/abstract";
import { Routes } from "../types/constants";
import { BadRequestError, NotFoundError } from "../types/errors";

const userRouter = Router();

userRouter.post(Routes.login, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, password } = req.body as IUser;
		const user = await User._findOne({ username });
		if (!user) throw new BadRequestError("Invalid username.");

		const passwordMatch = await Password.compare(password, user.password);
		if (!passwordMatch) throw new BadRequestError("Invalid password.");

		const token = await Jwt.SignUser({
			id: user.id,
			username: user.username
		});

		return res.status(200).send({
			ok: true,
			status: 200,
			data: { token }
		} as IResponse<{ token: string }>);
	} catch (error) {
		next(error);
	}
});

userRouter.post(Routes.register, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, password } = req.body as IUser;

		if (!isAlphaNumeric(username)) throw new BadRequestError("Username must be alphanumeric only.");

		if (username.length < 3) {
			throw new BadRequestError("Username must be at least 3 characters.");
		} else if (username.length > 16) {
			throw new BadRequestError("Username must be no more than 16 characters.");
		}
		if (password.length < 8) throw new BadRequestError("Password must be at least 8 characters.");

		if (await User._findOne({ username })) throw new BadRequestError("Username not available.");

		const user = await User._createOrUpdate({
			id: newId(),
			username,
			password: await Password.hash(password)
		});

		const token = await Jwt.SignUser({
			id: user.id,
			username: user.username
		});

		return res.status(200).send({
			ok: true,
			status: 200,
			data: { token }
		} as IResponse<{ token: string }>);
	} catch (error) {
		next(error);
	}
});

userRouter.post(Routes.validate, validate, async (_req: Request, res: Response, next: NextFunction) => {
	try {
		return res.status(200).send({
			ok: true,
			status: 200,
			data: res.locals.jwt
		} as IResponse);
	} catch (error) {
		next(error);
	}
});

userRouter.put(Routes.update, validate, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id, username, newPassword, password } = req.body as IUser & { newPassword: string };

		const payload = { id } as IUser;

		const user = await User._findOne({ id });
		if (!user) throw new NotFoundError("User not found.");

		if (username) {
			if (!isAlphaNumeric(username)) throw new BadRequestError("Username must be alphanumeric only.");
			if (username.length < 3) {
				throw new BadRequestError("Username must be at least 3 characters.");
			} else if (username.length > 16) {
				throw new BadRequestError("Username must be no more than 16 characters.");
			}
			if (await User._findOne({ username })) throw new BadRequestError("Username not available.");
			payload.username = username;
		}

		if (newPassword) {
			if (newPassword.length < 8) throw new BadRequestError("Password must be at least 8 characters.");
			payload.password = await Password.hash(newPassword);
		}

		const passwordMatch = await Password.compare(password, user.password);
		if (!passwordMatch) throw new BadRequestError("Invalid password.");

		const updatedUser = await User._createOrUpdate(payload, { id });

		const token = await Jwt.SignUser({
			id: updatedUser.id,
			username: updatedUser.username
		});

		return res.status(200).send({
			ok: true,
			status: 200,
			data: { token }
		} as IResponse<{ token: string }>);
	} catch (error) {
		next(error);
	}
});

userRouter.delete(Routes.delete, validate, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.body as IUser;
		const user = await User._deleteOne({ id });
		return res.status(200).send({
			ok: true,
			status: 200,
			data: user
		} as IResponse<IUser>);
	} catch (error) {
		next(error);
	}
});

export default userRouter;
