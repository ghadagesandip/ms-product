import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { json } from "body-parser";
import helmet from "helmet";
import cors from "cors";

import registerRoute from "./routes";
import loggerFactory from "./utils/logger";

const logger = loggerFactory("server.ts");
const app: Application = express();
dotenv.config();

// middlewares
app.use(json());
app.use(helmet());
app.use(cors());

// setup route
registerRoute(app);

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Product Server ");
});
app.all("*", (req, resp) => {
	resp.send("404 Not found.").status(404);
});

// error handler middleware
app.use((err) => {
	logger.info("err occured", err);
});

const errorResponder = (
	error: any,
	request: Request,
	response: Response,
	next: NextFunction
) => {
	response.header("Content-Type", "application/json");

	const status = error.status || 400;
	response.status(status).send(error.message);
	next();
};

app.use(errorResponder);
export default app;
