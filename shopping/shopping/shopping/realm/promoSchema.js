/*
* This scheme is stored in the database as representatives of promotions codes available and check when user
* tries to use promo codes while purchasing.
* */

export default {
	name: "Promo",
	properties: {
		code: "string",
		discount: "int",
	}
};