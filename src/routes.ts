import { Application } from 'express';
import ProductController from './modules/product/product.controller';
import CategoryController from './modules/category/category.controller';

export default function registerRoute(app: Application): void{
    new ProductController(app);
    new CategoryController(app);

}
