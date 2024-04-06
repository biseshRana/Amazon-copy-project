//we start by taking in the information from the cart and all the products available
import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
let cartSummaryHTML = ''; //variable that will hold all the HTML of the checkout left tab

cart.forEach((cartItem) => //loops through all the objects in your cart, the paramater represents an object
{
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => //loops through all the products. If the object ID matches the product ID then variable matchingProduct will be set equal to the entire product object.
    {
        if (product.id === productId)
        {
            matchingProduct = product;
        }
    }); 
    //we then generate the HTML of the checkout left tab so that it will run custom to each new matchingProduct 
    cartSummaryHTML += //all of the HTML of all matchingPrdoucts is put within cartSummaryHTML
    `
        <div class="cart-item-container">
        <div class="delivery-date">
        Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image"
            src="${matchingProduct.image}">

        <div class="cart-item-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents / 100)}
            </div>
            <div class="product-quantity">
            <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
                Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
                Delete
            </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
            <div class="delivery-option">
            <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                FREE Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                $4.99 - Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                Monday, June 13
                </div>
                <div class="delivery-option-price">
                $9.99 - Shipping
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    `;
});
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML; //the collective html is then put within the div that contained the socks and basketball so now it will collecct all matchingProducts rather than just those two. 
document.querySelectorAll('.js-delete-quantity-link').forEach((link) => 
{
    link.addEventListener('click', () => 
    {
       const productId = link.dataset.productId; //above in the HTML string, we set the delete button an attribute of the ID. 
       removeFromCart(productId); 
    });
});
