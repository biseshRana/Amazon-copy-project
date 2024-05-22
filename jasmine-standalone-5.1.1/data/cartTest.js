import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => 
    {
        it('adds an existing product to the cart', () => 
            {

            });
        it('adds a new product to the cart', () => 
            {
                //16:39:00
                spyON(localStorage, 'getItem').and.callFake(() => 
                    {
                        return JSON.stringify([]);
                    });
                    loadFromStorage();//resets the cart to 0
                    //16-1) We want to return an empty string so if we do an object to the cart, it will return T/F correctly
                addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
                expect(cart.length).toEqual(1);
            });
    });