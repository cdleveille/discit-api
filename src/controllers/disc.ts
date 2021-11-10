import { Request, Response, Router } from "express";

import log from "../services/log";
import { DiscRepository as DiscRepo } from "../repositories/DiscRepository";
import { Disc } from "../models/Disc";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindAll(manager);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/:id", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindID(manager, +req.params.id);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/name/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindName(manager, req.params.val);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/brand/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindBrand(manager, req.params.val);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/category/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindCategory(manager, req.params.val);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/speed/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindSpeed(manager, req.params.val);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/glide/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindGlide(manager, req.params.val);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/turn/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindTurn(manager, req.params.val);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

router.get("/fade/:val", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindFade(manager, req.params.val);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

export default router;
