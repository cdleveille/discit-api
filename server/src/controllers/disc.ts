import { EntityManager } from "@mikro-orm/knex";
import { Request, Response, Router } from "express";

import { Disc } from "../models/Disc";
import log from "../services/log";
import { DiscRepository as DiscRepo } from "../repositories/DiscRepository";
import { Routes } from "../types/constants";

const discRouter = Router();

discRouter.get(Routes.root, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const em: EntityManager = res.locals.em;
		const discs = await DiscRepo.FindByQuery(em, req.query);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get(`${Routes.name}/`, async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get(`${Routes.name}/:val`, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByName(manager, req.params.val);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get(`${Routes.brand}/`, async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get(`${Routes.brand}/:val`, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByBrand(manager, req.params.val);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get(`${Routes.category}/`, async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get(`${Routes.category}/:val`, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByCategory(manager, req.params.val);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get(`${Routes.speed}/`, async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get(`${Routes.speed}/:val`, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindBySpeed(manager, req.params.val);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get(`${Routes.glide}/`, async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get(`${Routes.glide}/:val`, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByGlide(manager, req.params.val);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get(`${Routes.turn}/`, async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get(`${Routes.turn}/:val`, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByTurn(manager, req.params.val);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get(`${Routes.fade}/`, async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get(`${Routes.fade}/:val`, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByFade(manager, req.params.val);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get(`${Routes.stability}/`, async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get(`${Routes.stability}/:val`, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByStability(manager, req.params.val);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

export default discRouter;