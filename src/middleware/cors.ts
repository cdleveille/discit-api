import { Elysia } from "elysia";

import { cors } from "@elysiajs/cors";

export const useCors = (app: Elysia) => app.use(cors());
