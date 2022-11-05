import mongoose from 'mongoose';
import {IProduct} from './product.types';

const { Schema } = mongoose;



const productSchema = new Schema({
    name: {
        type:String,
        required: true,
        unique:true
    },
    description: {
        type:String,
        required: true
    },
    image: {
        type:String,
    },
    price: {
        type:Number,
        required: true
    },
    brand: {
        type:String,
        required: true
    },
    model_name: {
        type:String,
        required: true
    }
},{
    timestamps: true
});

export default mongoose.model('Product', productSchema)