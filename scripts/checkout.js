import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from '../zpractice.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart, loadCartFetch } from '../data/cart.js';
//import '../data/backend-practice.js';
//import '../data/cart-class.js';

async function loadPage()
{
    //await loadProductsFetch();//loads products. Await waits for the function. Proves that even tho function has a built in wait response in its defintion you still need to wait for when it when you call it

    /*await new Promise((resolve) => //loads cart 
        {
            loadCart(() => 
                {
                    resolve(); //waits for the asynchronos load cart function to finish. idk why it still needs the resolve if it has await. 
                });
        });*/
        //await loadCartFetch();
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
          ]);
        renderCheckoutHeader();//generates the rest of the page
        renderOrderSummary();
        renderPaymentSummary();

}
loadPage();


/*promise all
Promise.all([
    loadProductsFetch(), //returns a promise allowing us to use it with promise.all. Loads products. idk why this one doesnt have to be waited on call but the other one above does.
    new Promise((resolve) => //Loads cart
        {
            loadCart(() => 
                {
                    resolve();//waits for function.
                });
        })
        
]).then(() =>
    {
        renderCheckoutHeader();//generates rest of page.
        renderOrderSummary();
        renderPaymentSummary();
    });*/


/*promises without promise all 
new Promise((resolve) => {//loads all products
    loadProducts(() => 
        {
            resolve('value1');//waits for the asyncrchonos function
        });
}).then((value) => //after that loads cart
    {
        console.log(value);
        return new Promise((resolve) => 
            {
                loadCart(() => 
                    {
                        resolve();//allows asyncronos function to fully execute
                    });
            });
    }).then(() => //after that rest of the page generates
        {
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
        });
/*


/*callback- just spamming functions. Doesn't matter where they are defined within the same file or other file (if imported) as long as they are defined. Super simple. 

loadProducts(() => { //load products. should have to wait for both of these functions
    loadCart(() =>  //load cart
        {
            renderCheckoutHeader(); //load rest of page
            renderOrderSummary();
            renderPaymentSummary();
        });
});*/
