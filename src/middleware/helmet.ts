import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";

export const useHelmet = (app: Elysia) => app.use(helmet({ contentSecurityPolicy: false }));
