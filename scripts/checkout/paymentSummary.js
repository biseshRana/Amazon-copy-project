import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import formatCurrency from '../utils/money.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary()//generates all data and HTML for right side of the section
{
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem) => //15-8)purpose of this loop is to go through each item in the cart, and multiply the item price with quantity. We will need the productId to get both variables as cart has just the productId, quantity, and delivery option. 
        {
            const product = getProduct(cartItem.productId);
            productPriceCents += product.priceCents * cartItem.quantity; 

            const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
            shippingPriceCents += deliveryOption.priceCents;
        });

        let cartQuantity = 0;
        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
        const taxCents = totalBeforeTaxCents * 0.1;
        const totalCents = totalBeforeTaxCents + taxCents; 

        const paymentSummaryHTML = 
        `
            <div class="payment-summary-title">
            Order Summary
            </div>

            <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)/100}</div>
            </div>

            <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)/100}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)/100}</div>
            </div>

            <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents/100)}</div>
            </div>

            <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents/100)}</div>
            </div>

            <button class="place-order-button button-primary js-place-order">
            Place your order
            </button>
        `;

        document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
 
        document.querySelector('.js-place-order')
        .addEventListener('click', async () => //do this so we can use await
            {
             const response = await fetch('https://supersimplebackend.dev/orders', {//since fetch returns a promise we can use await on it.
                method: 'Post', 
                headers: {//type of data you're sending. This one is JSON
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({//we can't send JS directly so we turn it into JSON
                    cart: cart //right side is our cart array. Left is name of object required by the backend for this order
                })
             });
             
             const order = await response.json(); //use await on this response.json is also a promise
             addOrder(order);
            });

            window.location.href = 'orders.html'; //replaces everything past the slash in the searh bar with orders.html, opening the orders.html filepath. window.location.href itself just gets the url address
}