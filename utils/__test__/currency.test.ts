import { parseCurrency } from "../currency";

describe('currency', ()=>{
    describe('parseCurrency',()=>{
        it('should return the localized price', ()=>{
            const currently = 500;
            ///agregue delante del 500 ese codigo para que no falle el space en el test
            const expected= `$\xa0500,00`

            expect(parseCurrency(currently)).toEqual(expected);
        })
    })
})