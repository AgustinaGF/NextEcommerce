import { GetStaticProps } from "next";

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
	return {
		revalidate: 10,
		props: {
			products,
		},
	};
};

export default IndexRoute;