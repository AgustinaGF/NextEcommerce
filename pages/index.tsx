import { GetStaticProps } from "next";

import { Product } from "../products/types";
import api from "../products/api";
import StoreScreen from "../products/screens/Store";
import { useEffect, useMemo, useState } from "react";

interface Props {
	products: Product[];
}

const IndexRoute: React.FC<Props> = ({ products }) => {
	return <StoreScreen products={products} />;
};

export const getStaticProps: GetStaticProps = async () => {
	const products = await api.list();
	return {
		revalidate: 10,
		props: {
			products,
		},
	};
};

export default IndexRoute;
