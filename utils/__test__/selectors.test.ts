import { editCart } from "../../products/selectors";
import { CartItem, Product } from "../../products/types"

describe('editCart', ()=>{
    it ('should reduce the amount of a product by one', ()=>{
        const product : Product={
            id: 'id',
            category: 'category',
            description:'description',
            image:'image',
            price:100,
            title:'title'
        }
        const currently: CartItem[]= [{...product, quantity:5}];
        const expected :CartItem[]= [{...product, quantity:4}];
        expect(editCart(product, 'decrement')(currently)).toEqual(expected)
    })
    it ('should increment the amount of a product by one', ()=>{
        const product : Product={
            id: 'id',
            category: 'category',
            description:'description',
            image:'image',
            price:100,
            title:'title'
        }
        const currently: CartItem[]= [{...product, quantity:5}];
        const expected :CartItem[]= [{...product, quantity:6}];
        expect(editCart(product, 'increment')(currently)).toEqual(expected)
    })
    it ('should delete a product if we reduce and the quantity selected was one', ()=>{
        const product : Product={
            id: 'id',
            category: 'category',
            description:'description',
            image:'image',
            price:100,
            title:'title'
        }
        const currently: CartItem[]= [{...product, quantity:1}];
        const expected :CartItem[]= [];
        expect(editCart(product, 'decrement')(currently)).toEqual(expected)
    })
})