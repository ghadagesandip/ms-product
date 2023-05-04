import BaseController from "../base.controller";
import { Application, Request, Response } from "express";
import { CartLib } from "./cart.lib";
import { addCartValidation } from "./cart.middleware";

export default class CartController extends BaseController {
	constructor(app: Application) {
		super();
		this.register(app);
	}

	public register(app: Application): void {
		app.use("/api/cart", this.router);
		this.router.get("/", this.index);
		this.router.post("/", addCartValidation, this.add);
		this.router.delete("/:id", this.deleteRecord);
	}

	public async index(req: Request, res: Response): Promise<void> {
		try {
			const cartLib = new CartLib();
			const category = await cartLib.index();
			res.send(category).status(200);
		} catch (err) {
			console.log("err", err);
		}
	}

	public async add(req: Request, res: Response): Promise<void> {
		try {
			const productData = req.body;
			const cartLib = new CartLib();
			const cartItem = await cartLib.add(productData);
			res.send(cartItem).status(200);
		} catch (err) {
			console.log("err", err);
			res.send("Error while creating obj").status(500);
		}
	}

	public async deleteRecord(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const cartLib = new CartLib();
			const cartItem = await cartLib.getById(id);
			if (cartItem) {
				await cartLib.delete(id);
				res.send({ message: "delete category" }).status(200);
			} else {
				res.send({ message: "category not exists" }).status(404);
			}
		} catch (err) {
			res.send("Error while deleting record").status(500);
		}
	}
}
