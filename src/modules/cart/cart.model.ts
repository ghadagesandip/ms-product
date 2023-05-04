import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema(
	{
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		itemPrice: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Cart", cartSchema);
