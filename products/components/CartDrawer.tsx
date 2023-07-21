import * as React from "react";
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Link,
  Stack,
  Text,
  Image,
  DrawerProps,
  CloseButton,
} from "@chakra-ui/react";
import { CartItem, Product } from "../types";
import { INFORMATION } from "../../app/constants";
import { parseCurrency } from "../../utils/currency";
import { useEffect, useMemo } from "react";

interface Props extends Omit<DrawerProps, "children"> {
  items: CartItem[];
  onIncrement: (product: Product) => void;
  onDecrement: (product: Product) => void;
}

const CartDrawer: React.FC<Props> = ({
  items,
  onDecrement,
  onIncrement,
  onClose,
  ...props
}) => {
  const total = useMemo(
    () =>
      parseCurrency(
        //prettier-ignore
        items.reduce((total, product) => total + product.price * product.quantity,0)
      ),
    [items]
  );
  const text = useMemo(
    () =>
      items
        .reduce(
          (message, product) =>
            message.concat(
              `* ${product.title} ${
                product.quantity > 1 ? `(x${product.quantity})` : ""
              } - ${parseCurrency(product.price * product.quantity)}
                \n`
            ),
          ``
        )
        .concat(`\nTotal: ${total}`),
    [items, total]
  );

  useEffect(() => {
    if (!items.length) {
      onClose();
    }
  }, [items.length, onClose]);

  return (
    <div>
      {
        <Drawer placement="right" onClose={onClose} {...props}>
          <DrawerOverlay />
          <DrawerContent paddingTop={6}>
            <DrawerHeader>
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between">
                <Text fontSize={{ base: "2xl", sm: "3xl" }}>
                  Your Order ({items.length})
                </Text>
                <CloseButton onClick={onClose}></CloseButton>
              </Stack>
            </DrawerHeader>
            <DrawerBody data-testid="cart">
              {Boolean(items.length) ? (
                <Stack spacing={4} divider={<Divider />}>
                  {items.map((product) => (
                    <Stack
                      data-testid="cart-item"
                      direction="row"
                      key={product.id}>
                      <Stack width="100%">
                        <Stack direction="row" justifyContent="space-between">
                          <Text fontWeight="lg">
                            {product.title}
                            {product.quantity > 1
                              ? `( x${product.quantity})`
                              : ""}
                          </Text>
                          <Text>
                            {parseCurrency(product.price * product.quantity)}
                          </Text>
                          <HStack spacing={3}></HStack>
                        </Stack>
                        <Stack direction="row">
                          <Button
                            size="xs"
                            onClick={() => onDecrement(product)}
                            data-testid="decrement"
                            colorScheme="primary"
                            borderRadius={9999}>
                            -
                          </Button>
                          <Text fontWeight={500}>{product.quantity}</Text>
                          <Button
                            size="xs"
                            onClick={() => onIncrement(product)}
                            data-testid="increment"
                            colorScheme="primary"
                            borderRadius={9999}>
                            +
                          </Button>
                        </Stack>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              ) : (
                <Text color="gray.400">There are not items in your cart</Text>
              )}
            </DrawerBody>

            {Boolean(items.length) && (
              <DrawerFooter>
                <Stack width="100%" spacing={4}>
                  <Divider></Divider>
                  <Stack
                    direction="row"
                    fontWeight="500"
                    justifyContent="space-between"
                    alignItems="center"
                    fontSize="lg">
                    <Text>Total</Text>
                    <Text>{total}</Text>
                  </Stack>
                  <Button
                    data-testid="complete-order"
                    as={Link}
                    href={`https://wa.me/${
                      INFORMATION.phone
                    }?text=${encodeURIComponent(text)}`}
                    isExternal
                    colorScheme="whatsapp"
                    padding={4}
                    size="lg"
                    width="100%"
                    leftIcon={
                      <Image
                        src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff"
                        alt="icon"
                      />
                    }>
                    Complete Order
                  </Button>
                </Stack>
              </DrawerFooter>
            )}
          </DrawerContent>
        </Drawer>
      }
    </div>
  );
};

export default CartDrawer;
