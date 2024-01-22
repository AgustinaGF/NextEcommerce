export interface Product {
	id: string;
	title: string;
	category: string;
	description: string;
	url?: string
	image: string;
	price: number;
}
export interface CartItem extends Product {
	quantity: number;
}