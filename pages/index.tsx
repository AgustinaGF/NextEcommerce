import { GetStaticProps } from "next";
import { Product } from "../products/types";

interface Props {
	products: Product[];
}

const IndexRoute: React.FC<Props> = () => {
	return <div>index</div>;
};

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			products: [],
		},
	};
};

export default IndexRoute;
