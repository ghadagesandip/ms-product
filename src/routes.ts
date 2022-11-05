import { Application } from 'express';
import ProductController from './modules/product/product.controller';

export default function registerRoute(app: Application): void{
    new ProductController(app);
}
