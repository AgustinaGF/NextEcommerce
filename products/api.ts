import axios from "axios";
import Papa from "papaparse";
import { Product } from "./types";

export default {
	list: async (): Promise<Product[]> => {
		return axios
			.get(
				`https://docs.google.com/spreadsheets/d/e/2PACX-1vT-zOoG-24hIgf7sAc-5XWSsztMVMBN23mar70bddptwNMQa1UEe5FnirsUyoHMXxl6nyWyAJy1WaCi/pub?output=csv`,
				{ responseType: "blob" }
			)
			.then((response) => {
				return new Promise<Product[]>((resolve, reject) => {
					Papa.parse(response.data, {
						header: true,
						complete: (results) => {
							const products = results.data as Product[];
							return resolve(
								products.map((product) => ({
									...product,
									price: Number(product.price),
								}))
							);
						},
						error: (error) => reject(error.message),
					});
				});
			});
	},
	mock:{
		list:(mock:string) :Promise<Product>=> import(`./moks/${mock}.json`)
	}
};
