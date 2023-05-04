import BaseController from "./../base.controller";
import { Application, Request, Response } from "express";
import { ProductLib } from "./product.lib";
import { IProduct } from "./product.types";

export default class ProductController extends BaseController {
	constructor(app: Application) {
		super();
		this.register(app);
	}

	public register(app: Application): void {
		app.use("/api/product", this.router);
		this.router.get("/", this.index);
		this.router.post("/", this.add);
		this.router.put("/:id", this.updateProduct);
		this.router.get("/:id", this.getProduct);
		this.router.delete("/:id", this.deleteProduct);
	}

	public async index(req: Request, res: Response): Promise<void> {
		try {
			console.log("list polices goes here", req.query);
			const page: number =
				req.query && req.query.page ? parseInt(req.query.page as string) : 1;
			const limit: number =
				req.query && req.query.limit ? parseInt(req.query.limit as string) : 10;
			console.log("page limit", page, limit);
			const productLib = new ProductLib();
			const products = await productLib.index(page - 1, limit);
			res.send(products).status(200);
		} catch (err) {
			console.log("err", err);
		}
	}

	public async add(req: Request, res: Response): Promise<void> {
		try {
			const productData = req.body;
			const productLib = new ProductLib();
			const product = await productLib.add(productData);
			res.send(product).status(200);
		} catch (err) {
			res.status(400).json({ error: "Error while creating obj", err });
		}
	}

	public async getProduct(req: Request, res: Response) {
		try {
			const id: string = req.params.id as string;
			const productLib = new ProductLib();
			const product = await productLib.getProductById(id);
			res.send(product).status(200);
		} catch (err) {
			res.send("Error while getting product").status(500);
		}
	}

	public async updateProduct(req: Request, res: Response): Promise<void> {
		try {
			const body: IProduct = req.body;
			const id = req.params.id;
			const productLib = new ProductLib();
			const productData = await productLib.updateById(id, body);
			res.send(productData).status(200);
		} catch (err) {
			res.send("Error while updating product").status(500);
		}
	}

	public async deleteProduct(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const productLib = new ProductLib();
			const product = await productLib.getProductById(id);
			if (product) {
				await productLib.delete(id);
				res.send({ message: "delete product" }).status(200);
			} else {
				res.send({ message: "product not exists" }).status(404);
			}
		} catch (err) {
			res.send("Error while deleting record").status(500);
		}
	}
}
