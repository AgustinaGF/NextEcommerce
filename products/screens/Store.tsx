import { Grid, Stack, Text, Button, Link, Flex, Image } from "@chakra-ui/react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

import { Product } from "../types";

import { useEffect, useMemo, useState } from "react";
import { parseCurrency } from "../../utils/currency";

interface Props {
	products: Product[];
}

const StoreScreen: React.FC<Props> = ({ products }) => {
	const [cart, setCart] = useState<Product[]>([]);
	const [seletedImage, setSeletedImage] = useState<string>(null);

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
		<LayoutGroup>
			<Stack spacing={6}>
				<Grid
					gridGap={6}
					templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
				>
					{products.map((product) => (
						<Stack
							data-test-id="product"
							borderRadius="md"
							padding={4}
							spacing={3}
							backgroundColor="gray.100"
							key={product.id}
						>
							<Image
								alt={product.title}
								as={motion.img}
								cursor="pointer"
								layoutId={product.image}
								src={product.image}
								maxHeight={128}
								objectFit="cover"
								onClick={() => setSeletedImage(product.image)}
							/>
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
				<AnimatePresence>
					{Boolean(cart.length) && (
						<Flex
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0 }}
							alignItems="center"
							justifyContent="center"
							position="sticky"
							bottom={4}
							as={motion.div}
						>
							<Button
								as={Link}
								href={`https://wa.me/549114156839?text=${encodeURIComponent(
									text
								)}`}
								isExternal
								colorScheme="whatsapp"
								width="fit-content"
								padding={4}
								leftIcon={
									<Image src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff" />
								}
							>
								Complete Order ({cart.length} products)
							</Button>
						</Flex>
					)}
				</AnimatePresence>
			</Stack>
			<AnimatePresence>
				{seletedImage && (
					<Flex
						key="backdrop"
						alignItems="center"
						as={motion.div}
						backgroundColor="rgba(0,0,0,0.5)"
						justifyContent="center"
						position="fixed"
						top={0}
						left={0}
						height="100%"
						width="100%"
						layoutId={seletedImage}
						onClick={() => setSeletedImage(null)}
					>
						<Image key="image" src={seletedImage} width={384} height={384} />
					</Flex>
				)}
			</AnimatePresence>
		</LayoutGroup>
	);
};

export default StoreScreen;
