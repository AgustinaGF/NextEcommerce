import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import CartDrawer from "../CartDrawer";

import { CartItem } from "../../types";

const cart: CartItem[] = [
  {
    id: "id",
    image: "image",
    price: 100,
    title: "title",
    category: "category",
    description: "description",
    quantity: 2,
  },
];

test("It should call onDecrement when decrement one product", () => {
  const onDecrement = jest.fn();
  render(
    <CartDrawer
      isOpen
      onClose={jest.fn()}
      items={cart}
      onIncrement={jest.fn()}
      onDecrement={onDecrement}
    />
  );

  fireEvent.click(screen.getByTestId("decrement"));

  expect(onDecrement).toHaveBeenCalled();
});

test("It should call onIncrement when inccrement one product", () => {
  const onIncrement = jest.fn();
  render(
    <CartDrawer
      isOpen
      onClose={jest.fn()}
      items={cart}
      onIncrement={onIncrement}
      onDecrement={jest.fn()}
    />
  );

  fireEvent.click(screen.getByTestId("increment"));

  expect(onIncrement).toHaveBeenCalled();
});

test("Shows a message that there are no items when the cart is empty", () => {
  render(
    <CartDrawer
      isOpen
      onClose={jest.fn()}
      items={[]}
      onIncrement={jest.fn()}
      onDecrement={jest.fn()}
    />
  );

  expect(
    screen.getByText("There are not items in your cart")
  ).toBeInTheDocument();
});
