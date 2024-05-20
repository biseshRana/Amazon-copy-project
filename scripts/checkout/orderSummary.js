//14. All of this is lesson 14. we start by taking in the information from the cart and all the products available
import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary()//generates all the data and HTML for the left side
{

    let cartSummaryHTML = ''; //variable that will hold all the HTML of the checkout left tab

    cart.forEach((cartItem) => //loops through all the objects in your cart, the paramater represents an object
    {
        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);//15-10)everything below is this function explained

        /*products.forEach((product) => //loops through the products array. If the object ID matches the cart productID then variable matchingProduct will be set equal to the entire product object. This is done to get the remaining info such as name, rating, price, etc. that is not available within the cart objects. 
        {
            if (product.id === productId) //the reason this is product.id and not parameter.dataset.productId is because this for loop is looping through the product object which holds an ID variable. 
            {
                matchingProduct = product;
            }
        });*/ 

        const deliveryOptionId = cartItem.deliveryOptionId; 
        //15-4) cart item has one deliveryOption selected represented by an ID. This deliveryOptionId reps that.
        const deliveryOption = getDeliveryOption(deliveryOptionId);//15-11) comment below is explanation of this functions

        /*deliveryOptions.forEach((option) => { //15-5)cycles through each delivery option, given differnet name for parameter cause of let variable above. 
            if(option.id === deliveryOptionId)//15-6) essetially if cart array option id equals the one delivery array option has, then variable deliveryOption will equal the delivery array option. 
                {
                    deliveryOption = option;
                }
        
        });*/
        //15-7) this entire block of code is the formatting for the green delivery date. Idk why its messedup.
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays,'days'); 
        const dateString =deliveryDate.format('dddd, MMMM D');

        //we then generate the HTML of the checkout left tab so that it will run custom to each new matchingProduct 
        cartSummaryHTML += //all of the HTML of all matchingProducts is put within cartSummaryHTML
        `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
            Delivery date: ${dateString}
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
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
            </div>
        </div>
        `;
    });

    //this part is lesson 15
    function deliveryOptionsHTML(matchingProduct, cartItem)//matching product has to be passed as paramater because it was declared inside a function. ig cartItem has to be passed as a parameter to because it wasn't declared in here
    {
        let html = '';
        //delivery option parameter represents one object in array deliveryOptions (this thing is one of the three circles)
        deliveryOptions.forEach((deliveryOption) => 
            {
                const today = dayjs();//gets todays date
                const deliveryDate = today.add(deliveryOption.deliveryDays,'days'); //add on the number of days for the given deliveryOption
                const dateString =deliveryDate.format('dddd, MMMM D');
                //formats it
                const priceString = deliveryOption.priceCents === 0
    /*runs if true*/ ? 'FREE'
    /*run if false */:   `$${formatCurrency(deliveryOption.priceCents)/100}`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId; //15-3) deliveryOption is an objectin the deliveryOptions array. cartItem is a object in the cart array. We have to check if the cartItem delivery option (what the user chooses) mathces the deliveryOption (id)       

    html += //combines all the delivery options
                `<div class="delivery-option"
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                    ${isChecked ? 'checked' : ''} 
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} - Shipping
                    </div>
                </div>
                </div>`
            })
            return html;
    }

        document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML; //the collective html is then put within the div that contained the socks and basketball so now it will collecct all matchingProducts rather than just those two. 
    document.querySelectorAll('.js-delete-quantity-link').forEach((link) => 
    {
        link.addEventListener('click', () => 
        {
        const productId = link.dataset.productId; //above in the HTML string, we set the delete button an attribute of the ID. This is because each delete button is not unique for every item, they are all the same. With the data attribute, we can attach the unique ID to each delete button.  
        removeFromCart(productId); 

        const container = document.querySelector(`.js-cart-item-container-${productId}`) //in the HTML the div of all the HTML is given a class with the product ID. So every product in cart has its own unique head div. By putting the document.querySelector within the delete button eventListener, we only pull the head divs of the product in cart we wanna delete. 
        container.remove();

        renderPaymentSummary();
        });
    });

    document.querySelectorAll('.delivery-option').forEach((element) => //15-7) element represents a deliveryOption
        {
            element.addEventListener('click', () => 
                {
                    const {productId, deliveryOptionId} = element.dataset;
                    //same thing as const productId= element.dataset.productId; 
                    //const deliveryOptionId = element.dataset.deliveryOptionId;
                    updateDeliveryOption(productId, deliveryOptionId);
                    renderOrderSummary();//15-8) regenerates the entire HTML so it will change automatically. That's why the date only changed once you hit refresh before, its because the deliveryOptionID updated but the HTML didn't. 
                    renderPaymentSummary();
                });
        });
}

