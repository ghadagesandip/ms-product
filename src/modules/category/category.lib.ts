import categoryModel from './category.model';
import {ICategory} from './category.types';

export class CategoryLib {
    
    public async index(page: number, limit: number): Promise<any>{
        return categoryModel.find().limit(limit);
    }

    public async add(data: ICategory){
        return categoryModel.create(data)
    }

    public async getById(id:string){
        return categoryModel.findById(id);
    }

    public async updateById(id: string, data: ICategory){
        return categoryModel.findByIdAndUpdate(id, {$set: data}, {returnDocument: 'after'})
    }

    public async delete(id:string){
        return categoryModel.findByIdAndDelete(id);
    }
}