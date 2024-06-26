export let cart;

loadFromStorage();

export function loadFromStorage()
{
  cart = JSON.parse(localStorage.getItem('cart'));

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

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  const quantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
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

export function loadCart(fun) 
{
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    fun();
  });

    xhr.open('Get', 'https://supersimplebackend.dev/cart');
    xhr.send();
}

export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
  return text;}