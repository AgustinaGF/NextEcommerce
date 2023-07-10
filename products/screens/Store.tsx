import {
  Grid,
  Stack,
  Text,
  Button,
  Link,
  Flex,
  Image,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  HStack,
  CloseButton,
} from "@chakra-ui/react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { parseCurrency } from "../../utils/currency";

import { Product } from "../types";

import { useEffect, useMemo, useState } from "react";

import ProductCard from "../components/ProductCard";
import { INFORMATION } from "../../app/constants";
import { parse } from "papaparse";

interface Props {
  products: Product[];
}

interface CartItem extends Product {
  quantity: number;
}

const StoreScreen: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [seletedImage, setSeletedImage] = useState<string>(null);
  const [isCartOpen, toggleCart] = useState<boolean>(false);

  const total = useMemo(
    () =>
      parseCurrency(
        //prettier-ignore
        cart.reduce((total, product) => total + product.price * product.quantity,0)
      ),
    [cart]
  );
  const text = useMemo(
    () =>
      cart
        .reduce(
          (message, product) =>
            message.concat(
              `* ${product.title} - ${parseCurrency(
                product.price * product.quantity
              )}
            \n`
            ),
          ``
        )
        .concat(`\nTotal: ${total}`),
    [cart, total]
  );

  function bigImage(image) {
    setSeletedImage(image);
  }

  function handleEditCart(product: Product, action: "increment" | "decrement") {
    setCart((cart) => {
      const isInCart = cart.some((item) => item.id === product.id);

      if (!isInCart) {
        return cart.concat({
          ...product,
          quantity: 1,
        });
      }
      return cart.reduce((acc, _product) => {
        if (product.id != _product.id) {
          return acc.concat(_product);
        }

        if (action === "decrement") {
          if (_product.quantity === 1) {
            return acc;
          }
          return acc.concat({ ..._product, quantity: _product.quantity - 1 });
        } else if (action === "increment") {
          return acc.concat({ ..._product, quantity: _product.quantity + 1 });
        }
      }, []);
    });
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
                  width="fit-content"
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
        <Drawer
          isOpen={isCartOpen}
          placement="right"
          onClose={() => toggleCart(false)}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Your Order</DrawerHeader>
            <DrawerBody>
              <List spacing={4}>
                {cart.map((product) => (
                  <ListItem key={product.id}>
                    <Stack>
                      <HStack justifyContent="space-between">
                        <Text fontWeight="500">
                          {product.title}
                          {product.quantity > 1
                            ? `( x${product.quantity})`
                            : ""}
                        </Text>
                        <Text color="green.400">
                          {parseCurrency(product.price * product.quantity)}
                        </Text>
                        <HStack spacing={3}></HStack>
                      </HStack>
                      <HStack>
                        <Button
                          size="xs"
                          onClick={() => handleEditCart(product, "decrement")}>
                          -
                        </Button>
                        <Text>{product.quantity}</Text>
                        <Button
                          size="xs"
                          onClick={() => handleEditCart(product, "increment")}>
                          +
                        </Button>
                      </HStack>
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </DrawerBody>

            <DrawerFooter>
              <Button
                as={Link}
                href={`https://wa.me/${
                  INFORMATION.phone
                }?text=${encodeURIComponent(text)}`}
                isExternal
                colorScheme="whatsapp"
                width="fit-content"
                padding={4}
                leftIcon={
                  <Image
                    src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff"
                    alt="icon"
                  />
                }>
                Complete Order ({total})
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </LayoutGroup>
    </>
  );
};

export default StoreScreen;
