/*
* Used to represent products in the app. Products are never directly inserted into the database, rather they are
* pushed into the `cart` key of `User` objects.
* */

export default {
	name: "Product",
	properties: {
		id: "string",
		thumbnailSource: "string",
		title: "string",
		description: "string",
		discount: "string",
		price: "string",
		quantity: "int",
	}
};