import { Types } from "mongoose";
export interface IProduct {
	_id?: string;
	name: string;
	description: string;
	image?: string;
	price: number;
	brand: string;
	model_name: string;
	highlights: string[];
	category: Types.ObjectId;
}
