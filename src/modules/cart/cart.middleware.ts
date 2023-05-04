import { body, validationResult, check } from "express-validator";

export const addCartValidation = [
	check("productId", "Please select product").isString(),
];
