import { EntityManager } from "@mikro-orm/knex";
import { Request, Response, Router } from "express";

import { Disc } from "../models/Disc";
import log from "../services/log";
import { DiscRepository as DiscRepo } from "../repositories/DiscRepository";

const discRouter = Router();

discRouter.get("/", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const em: EntityManager = res.locals.em;
		const discs = await DiscRepo.FindByQuery(em, req.query);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get("/name/", async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get("/name/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByName(manager, req.params.val);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get("/brand/", async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get("/brand/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByBrand(manager, req.params.val);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get("/category/", async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get("/category/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByCategory(manager, req.params.val);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get("/speed/", async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get("/speed/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindBySpeed(manager, req.params.val);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get("/glide/", async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get("/glide/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByGlide(manager, req.params.val);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get("/turn/", async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get("/turn/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByTurn(manager, req.params.val);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get("/fade/", async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get("/fade/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByFade(manager, req.params.val);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.json([]);
	}
});

discRouter.get("/stability/", async (req: Request, res: Response): Promise<Response | void> => {
	return res.json([]);
});

discRouter.get("/stability/:val", async (req: Request, res: Response): Promise<Response | void> => {
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