import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { json } from "body-parser";
import helmet from "helmet";


const app: Application = express();
dotenv.config();

// middlewares
app.use(json());
app.use(helmet());

app.get('/', (req: Request, res:Response) => {
    res.send('Express + TypeScript Auth Server ');
});
app.all("*", (req, resp)=>{
    resp.send("404 Not found.").status(404)
});
export default app;