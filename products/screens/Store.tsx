import { Grid, Stack, Text, Button, Link, Flex, Image } from "@chakra-ui/react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

import { CartItem, Product } from "../types";

import { useState } from "react";

import ProductCard from "../components/ProductCard";
import CartDrawer from "../components/CartDrawer";
import { editCart } from "../selectors";

interface Props {
  products: Product[];
}

const StoreScreen: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [seletedImage, setSeletedImage] = useState<string>(null);
  const [isCartOpen, toggleCart] = useState<boolean>(false);

  function bigImage(image) {
    setSeletedImage(image);
  }

  function handleEditCart(product: Product, action: "increment" | "decrement") {
    setCart(editCart(product, action));
  }

  return (
    <>
      <LayoutGroup>
        <Stack spacing={6}>
          {Boolean(products.length) ? (
            <Grid
              gridGap={6}
              templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
              {products.map((product) => (
                <ProductCard
                  product={product}
                  key={product.id}
                  onAdd={(product) => handleEditCart(product, "increment")}
                  selectImage={() => bigImage(product.image)}
                />
              ))}
            </Grid>
          ) : (
            <Text color="green.500" margin="auto" fontSize="lg">
              No Products
            </Text>
          )}

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
                as={motion.div}>
                <Button
                  onClick={() => toggleCart(true)}
                  colorScheme="whatsapp"
                  width={{ base: "100%", sm: "fit-content" }}
                  padding={4}
                  leftIcon={
                    <Image
                      src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff"
                      alt="icon"
                    />
                  }>
                  Show Order (
                  {cart.reduce((acc, item) => acc + item.quantity, 0)} products)
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
              onClick={() => setSeletedImage(null)}>
              <Image src={seletedImage} width={384} height={384} alt="image" />
            </Flex>
          )}
        </AnimatePresence>
      </LayoutGroup>
      <CartDrawer
        items={cart}
        onIncrement={(product) => handleEditCart(product, "increment")}
        onDecrement={(product) => handleEditCart(product, "decrement")}
        isOpen={isCartOpen}
        onClose={() => toggleCart(false)}
      />
    </>
  );
};

export default StoreScreen;
