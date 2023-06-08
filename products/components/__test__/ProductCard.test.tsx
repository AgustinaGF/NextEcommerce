import * as React from "react"
import {render, screen} from "@testing-library/react"


import ProductCard  from "../ProductCard"

import {Product} from "../../types"

const product: Product = {
    id: "id",
    image:"image",
    price:100,
    title:"title",
    category: "category",
    description:"description"
}

test("It should show the title price and button", ()=>{
render(<ProductCard product={product} onAdd={jest.fn()} selectImage={jest.fn()}/>)

const priceRegex = new RegExp(String(product.price), 'i')

expect(screen.getByText(product.title)).toBeInTheDocument()
expect(screen.getByText(priceRegex)).toBeInTheDocument()
expect(screen.getByText("Add")).toBeInTheDocument()
})

// test("It should run onAdd when I click add", ()=>{})