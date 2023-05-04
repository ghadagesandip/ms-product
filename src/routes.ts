import { Application } from "express";
import ProductController from "./modules/product/product.controller";
import CartController from "./modules/cart/cart.controller";
import CategoryController from "./modules/category/category.controller";

export default function registerRoute(app: Application): void {
	new ProductController(app);
	new CategoryController(app);
	new CartController(app);
}
