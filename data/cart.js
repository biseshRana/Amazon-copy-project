export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {//if this left part wasn't here then cart would be only these two products.
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1' //lesson 15 stuff
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'//15-3)this is the default deliveryOption for all products added to cart
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      //only the products whose delete button has been clicked have a product ID. Since they will be the only products whose cartItem.productId is equal to the productId they won't be added to the new cart array
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId)//both parameters were not declared within updateDeliveryOption
{
  let matchingItem;

  cart.forEach((cartItem) => {//this entire function just ensures the product you clicked the button on matches with the product in the cart. 
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId; //sets optionId of cartItem to new option you clicked

  saveToStorage();
}

export function updateQuantity(productId, newQuantity) 
{
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}