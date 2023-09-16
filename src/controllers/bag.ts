import { NextFunction, Request, Response, Router } from "express";

import { newId, projection } from "../helpers/util";
import { validate } from "../middleware/jwt";
import { Bag } from "../models/bag";
import { Disc } from "../models/disc";
import { User } from "../models/user";
import { IBag, IResponse } from "../types/abstract";
import { Routes } from "../types/constants";
import { BadRequestError, NotFoundError } from "../types/errors";

const bagRouter = Router();

bagRouter.post(Routes.root, validate, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { user_id } = req.body as IBag;

		const user = await User._findOne({ id: user_id });
		if (!user) throw new NotFoundError("User not found.");

		const bags = await Bag._find({ user_id }, projection);

		return res.status(200).send({
			ok: true,
			status: 200,
			data: bags
		} as IResponse<IBag[]>);
	} catch (error) {
		next(error);
	}
});

bagRouter.post(Routes.create, validate, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { user_id, name } = req.body as IBag;

		const user = await User._findOne({ id: user_id });
		if (!user) throw new NotFoundError("User not found.");

		if (await Bag._findOne({ user_id, name })) throw new BadRequestError("You already have a bag of that name.");

		if (name.length < 1) {
			throw new BadRequestError("Bag name must be at least 1 character.");
		} else if (name.length > 32) {
			throw new BadRequestError("Bag name must be no more than 32 characters.");
		}

		const bag = await Bag._createOrUpdate({
			id: newId(),
			user_id,
			name
		});

		return res.status(200).send({
			ok: true,
			status: 200,
			data: bag
		} as IResponse<IBag>);
	} catch (error) {
		next(error);
	}
});

bagRouter.post(Routes.addDisc, validate, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id, disc_id } = req.body as IBag & { disc_id: string };

		const bag = await Bag._findOne({ id });
		if (!bag) throw new NotFoundError("Bag not found.");

		const disc = await Disc._findOne({ id: disc_id });
		if (!disc) throw new NotFoundError("Disc not found.");

		if (bag.discs.includes(disc_id)) throw new BadRequestError("Bag already contains this disc.");

		const updatedBag = await Bag._createOrUpdate(
			{
				discs: [...bag.discs, disc_id]
			},
			{ id }
		);

		return res.status(200).send({
			ok: true,
			status: 200,
			data: updatedBag
		} as IResponse<IBag>);
	} catch (error) {
		next(error);
	}
});

bagRouter.post(Routes.removeDisc, validate, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id, disc_id } = req.body as IBag & { disc_id: string };

		const bag = await Bag._findOne({ id });
		if (!bag) throw new NotFoundError("Bag not found.");

		const disc = await Disc._findOne({ id: disc_id });
		if (!disc) throw new NotFoundError("Disc not found.");

		if (!bag.discs.includes(disc_id)) throw new BadRequestError("Bag does not contain this disc.");

		const discs = bag.discs.filter(discId => discId !== disc_id);

		const updatedBag = await Bag._createOrUpdate({ discs }, { id });

		return res.status(200).send({
			ok: true,
			status: 200,
			data: updatedBag
		} as IResponse<IBag>);
	} catch (error) {
		next(error);
	}
});

export default bagRouter;
