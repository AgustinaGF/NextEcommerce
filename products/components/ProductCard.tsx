import * as React from "react";
import { Grid, Stack, Text, Button, Link, Flex, Image } from "@chakra-ui/react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Product } from "../types";
import { parseCurrency } from "../../utils/currency";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
  selectImage?: (image: String) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAdd, selectImage }) => {
  return (
    <Stack
      data-testid="product"
      borderRadius="md"
      padding={4}
      spacing={3}
      backgroundColor="gray.100"
      key={product.id}>
      <Image
        alt={product.title}
        as={motion.img}
        cursor="pointer"
        layoutId={product.image}
        src={product.image}
        maxHeight={128}
        objectFit="cover"
        loading="lazy"
        onClick={() => selectImage(product.image)}
      />
      <Stack spacing={1}>
        <Text fontSize="lg" fontWeight={500}>
          {product.title}
        </Text>
        <Text color="gray.600" height={12}>
          {product.description}
        </Text>
        <Text color="purple.500" fontSize="sm" fontWeight="500">
          {parseCurrency(product.price)}
        </Text>
      </Stack>
      <Button onClick={() => onAdd(product)} colorScheme="primary">
        Add
      </Button>
    </Stack>
  );
};

export default ProductCard;
