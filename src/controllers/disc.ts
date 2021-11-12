import { Request, Response, Router } from "express";

import log from "../services/log";
import { DiscRepository as DiscRepo } from "../repositories/DiscRepository";
import { Disc } from "../models/Disc";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const connection = res.locals.em.getConnection();
		const discs = await DiscRepo.FindByQuery(connection, req.query);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/:id", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByID(manager, +req.params.id);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/name/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByName(manager, req.params.val);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/brand/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByBrand(manager, req.params.val);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/category/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByCategory(manager, req.params.val);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/speed/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindBySpeed(manager, req.params.val);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/glide/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByGlide(manager, req.params.val);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/turn/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByTurn(manager, req.params.val);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/fade/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByFade(manager, req.params.val);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/stability/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindByStability(manager, req.params.val);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

export default router;