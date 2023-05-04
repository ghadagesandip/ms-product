import { IProduct } from "./product.types";

import { Schema, model } from "mongoose";

const productSchema = new Schema<IProduct>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
		price: {
			type: Number,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		model_name: {
			type: String,
			required: true,
		},
		highlights: [{ type: String, unique: true }],
		category: { type: Schema.Types.ObjectId, ref: "Category" },
	},
	{
		timestamps: true,
	}
);

export default model<IProduct>("Product", productSchema);
