import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import formatCurrency from '../utils/money.js';

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

            <button class="place-order-button button-primary">
            Place your order
            </button>
        `;

        document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
}