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
} from "@chakra-ui/react";
import { CartItem, Product } from "../types";
import { INFORMATION } from "../../app/constants";
import { parseCurrency } from "../../utils/currency";
import { useMemo } from "react";

interface Props extends Omit<DrawerProps, "children"> {
  items: CartItem[];
  onIncrement: (product: Product) => void;
  onDecrement: (product: Product) => void;
}

const CartDrawer: React.FC<Props> = ({
  items,
  onDecrement,
  onIncrement,
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

  return (
    <div>
      {
        <Drawer placement="right" {...props}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Your Order</DrawerHeader>
            <DrawerBody>
              <Stack spacing={4} divider={<Divider />}>
                {items.map((product) => (
                  <Stack direction="row" key={product.id}>
                    <Stack width="100%">
                      <Stack direction="row" justifyContent="space-between">
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
                      </Stack>
                      <Stack direction="row">
                        <Button size="xs" onClick={() => onDecrement(product)}>
                          -
                        </Button>
                        <Text>{product.quantity}</Text>
                        <Button size="xs" onClick={() => onIncrement(product)}>
                          +
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
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
      }
    </div>
  );
};

export default CartDrawer;
