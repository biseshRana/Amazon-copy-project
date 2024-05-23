function Cart(localStorageKey)
{
    const cart = 
    {
        cartItems: undefined,

        loadFromStorage: function()
        {
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        //this refrences cart. To call a thing within an object it has to be cart.thingName or this.thingName.  
        if (!this.cartItems) {//if this left part wasn't here then cart would be only these two products.
            this.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1' //lesson 15 stuff
            }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
            }];
        }
        },

        saveToStorage: function()
        {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

        addToCart: function(productId) {
            let matchingItem;
        
            this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
            });
        
            if (matchingItem) {
            matchingItem.quantity += 1;
            } else {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'//15-3)this is the default deliveryOption for all products added to cart
            });
            }
        
            this.saveToStorage();
        },

        removeFromCart(productId) {//same syntax as removeFromCart = function(productId)...
            const newCart = [];
        
            this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                //only the products whose delete button has been clicked have a product ID. Since they will be the only products whose cartItem.productId is equal to the productId they won't be added to the new cart array
                newCart.push(cartItem);
            }
            });
        
            this.cartItems = newCart;
        
            this.saveToStorage();
        },

        updateDeliveryOption(productId, deliveryOptionId)//both parameters were not declared within updateDeliveryOption
            {
            let matchingItem;

            this.addToCart.forEach((cartItem) => {//this entire function just ensures the product you clicked the button on matches with the product in the cart. 
                if (productId === cartItem.productId) {
                matchingItem = cartItem;
                }
            });

            matchingItem.deliveryOptionId = deliveryOptionId; //sets optionId of cartItem to new option you clicked

            this.saveToStorage();
            },

            updateQuantity(productId, newQuantity) 
            {
            let matchingItem;

            this.cartItem.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                matchingItem = cartItem;
                }
            });

            matchingItem.quantity = newQuantity;

            this.saveToStorage();
            }
    };

    return cart;
}

const cart = Cart('cart-bruh');
const businessCart = Cart('cart-fam');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
