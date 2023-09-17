import { Elysia } from "elysia";

import { cors } from "@elysiajs/cors";

export const initCors = (app: Elysia) => app.use(cors());
