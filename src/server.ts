import http, { Server } from "http";
import { connect } from "mongoose";
import app from "./app";
import loggerFactory from "./utils/logger";

const logger = loggerFactory("server.ts");
const port: number = parseInt(process.env.PORT as string) || 3000;
const mongoUrl: string = process.env.MONGO_URL || "";
const server: Server = http.createServer(app);

const startServer = async () => {
	try {
		connect(mongoUrl);
		logger.info("Connected to mongodb");
		server.listen(port);
	} catch (err) {
		logger.info("Error connecting mongodb");
	}
};
server.on("listening", () => {
	logger.info("Server is up and running on port " + port);
});

startServer();
