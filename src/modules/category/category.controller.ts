import BaseController from "../base.controller";
import { Application, Request, Response } from "express";
import { CategoryLib } from "./category.lib";
import { ICategory } from "./category.types";
import loggerFactory from "../../utils/logger";

const logger = loggerFactory("server.ts");
export default class CategoryController extends BaseController {
	constructor(app: Application) {
		super();
		this.register(app);
	}

	public register(app: Application): void {
		app.use("/api/category", this.router);
		this.router.get("/", this.index);
		this.router.post("/", this.add);
		this.router.put("/:id", this.updateRecord);
		this.router.get("/:id", this.getRecord);
		this.router.delete("/:id", this.deleteRecord);
	}

	public async index(req: Request, res: Response): Promise<void> {
		try {
			const page: number =
				req.query && req.query.page ? parseInt(req.query.page as string) : 1;
			const limit: number =
				req.query && req.query.limit ? parseInt(req.query.limit as string) : 10;
			const categoryLib = new CategoryLib();
			const category = await categoryLib.index(page - 1, limit);
			res.send(category).status(200);
		} catch (err) {
			logger.info("err", err);
		}
	}

	public async add(req: Request, res: Response): Promise<void> {
		try {
			const productData = req.body;
			const categoryLib = new CategoryLib();
			const category = await categoryLib.add(productData);
			res.send(category).status(200);
		} catch (err) {
			logger.info("err", err);
			res.send("Error while creating obj").status(500);
		}
	}

	public async getRecord(req: Request, res: Response) {
		try {
			const id: string = req.params.id as string;
			const categoryLib = new CategoryLib();
			const category = await categoryLib.getById(id);
			res.send(category).status(200);
		} catch (err) {
			res.send("Error while getting category").status(500);
		}
	}

	public async updateRecord(req: Request, res: Response): Promise<void> {
		try {
			const body: ICategory = req.body;
			const id = req.params.id;
			const categoryLib = new CategoryLib();
			const productData = await categoryLib.updateById(id, body);
			res.send(productData).status(200);
		} catch (err) {
			res.send("Error while updating category").status(500);
		}
	}

	public async deleteRecord(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const categoryLib = new CategoryLib();
			const category = await categoryLib.getById(id);
			if (category) {
				await categoryLib.delete(id);
				res.send({ message: "delete category" }).status(200);
			} else {
				res.send({ message: "category not exists" }).status(404);
			}
		} catch (err) {
			res.send("Error while deleting record").status(500);
		}
	}
}
