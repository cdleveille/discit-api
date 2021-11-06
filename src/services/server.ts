import express from "express";

import router from "../controllers/main";

const app = express();

app.use("/api", router);

export default app;
