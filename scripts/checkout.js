import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from '../zpractice.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/backend-practice.js';
//import '../data/cart-class.js';

Promise.all([
    new Promise((resolve) => {
        loadProducts(() => 
            {
                resolve('value1');
            });
    }),
    new Promise((resolve) => 
        {
            loadCart(() => 
                {
                    resolve();
                });
        })
        
]).then(() =>
    {
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    });

/*promises without promise all 
new Promise((resolve) => {
    loadProducts(() => 
        {
            resolve('value1');
        });
}).then((value) => 
    {
        console.log(value);
        return new Promise((resolve) => 
            {
                loadCart(() => 
                    {
                        resolve();
                    });
            });
    }).then(() => 
        {
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
        });
/*

/*callback
loadProducts(() => {
    loadCart(() => 
        {
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
        });
});*/
