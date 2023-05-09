import { GetStaticProps } from "next";
import { Grid, Stack, Text, Button, Link, Box, Flex } from "@chakra-ui/react";

import { Product } from "../products/types";
import api from "../products/api";
import { useMemo, useState } from "react";

interface Props {
	products: Product[];
}

function parseCurrency(value: number): string {
	return value.toLocaleString("es-AR", {
		style: "currency",
		currency: "ARS",
	});
}
const IndexRoute: React.FC<Props> = ({ products }) => {
	const [cart, setCart] = useState<Product[]>([]);

	const text = useMemo(() => {
		return cart
			.reduce(
				(message, product) =>
					message.concat(
						`* ${product.title} - ${parseCurrency(product.price)}\n`
					),
				``
			)
			.concat(
				`\nTotal: ${parseCurrency(
					cart.reduce((total, product) => total + product.price, 0)
				)}`
			);
	}, [cart]);

	function handleAddToCart(product: Product) {
		setCart((cart) => cart.concat(product));
	}

	return (
		<Stack spacing={6}>
			<Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
				{products.map((product) => (
					<Stack
						borderRadius="md"
						padding={4}
						spacing={3}
						backgroundColor="gray.100"
						key={product.id}
					>
						<Stack spacing={1}>
							<Text>{product.title}</Text>
							<Text color="purple.500" fontSize="sm" fontWeight="500">
								{parseCurrency(product.price)}
							</Text>
						</Stack>
						<Button
							onClick={() => handleAddToCart(product)}
							colorScheme="primary"
						>
							Add
						</Button>
					</Stack>
				))}
			</Grid>
			{Boolean(cart.length) && (
				<Flex
					alignItems="center"
					justifyContent="center"
					position="sticky"
					bottom={4}
				>
					<Button
						as={Link}
						href={`https://wa.me/549114156839?text=${encodeURIComponent(text)}`}
						isExternal
						colorScheme="whatsapp"
						width="fit-content"
						padding={4}
					>
						Complete Order ({cart.length} products)
					</Button>
				</Flex>
			)}
		</Stack>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const products = await api.list();
	return {
		props: {
			products,
		},
	};
};

export default IndexRoute;
