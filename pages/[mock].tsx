import { GetStaticPaths, GetStaticProps } from "next";

import { Product } from "../products/types";
import api from "../products/api";
import StoreScreen from "../products/screens/Store";
import { useEffect, useMemo, useState } from "react";
import {ParsedUrlQuery} from  'querystring'


interface Props {
	products: Product[];
}

interface Params extends ParsedUrlQuery {
	mock: string;
}
const IndexRoute: React.FC<Props> = ({ products }) => {
	return <StoreScreen products={products} />;
};

export const getStaticProps: GetStaticProps <unknown, Params>= async ({params}) => {
	const products = await api.mock.list(params.mock);
console.log(products)
	return {
		revalidate: 10,
		props: {
			products,
		},
	};
};
export const getStaticPaths: GetStaticPaths = async()=>{
	return{
		paths:[],
		///esto permite que no se ejecute en prod
		fallback:process.env.NODE_ENV=== "production" ? false: "blocking"
	}
}
export default IndexRoute;