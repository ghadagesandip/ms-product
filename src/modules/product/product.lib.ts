import productModel from './product.model';
import {IProduct} from './product.types';

export class ProductLib {
    
    public async index(page: number, limit: number): Promise<any>{
        return productModel.find().limit(limit);
    }

    public async add(data: IProduct){
        return productModel.create(data)
    }

    public async getProductById(id:string){
        return productModel.findById(id);
    }

    public async updateById(id: string, data: IProduct){
        return productModel.findByIdAndUpdate(id, {$set: data}, {returnDocument: 'after'})
    }

    public async delete(id:string){
        return productModel.findByIdAndDelete(id);
    }
}