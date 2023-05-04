import cartModel from "./cart.model";
import { ICart } from "./cart.types";

export class CartLib {
	public async index(): Promise<any> {
		return cartModel.find();
	}

	public async add(data: ICart) {
		return cartModel.create(data);
	}

	public async getById(id: string) {
		return cartModel.findById(id);
	}

	public async updateById(id: string, data: ICart) {
		return cartModel.findByIdAndUpdate(
			id,
			{ $set: data },
			{ returnDocument: "after" }
		);
	}

	public async delete(id: string) {
		return cartModel.findByIdAndDelete(id);
	}
}
