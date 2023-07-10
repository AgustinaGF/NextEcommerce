import axios from "axios";
import Papa from "papaparse";
import { Product } from "./types";
import { INFORMATION } from "../app/constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	list: async (): Promise<Product[]> => {
		return axios
			.get(
				INFORMATION.sheet,
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
		list:(mock:string) :Promise<Product> => import(`./mocks/${mock}.json`).then((result)=>result.default),
	}
};
