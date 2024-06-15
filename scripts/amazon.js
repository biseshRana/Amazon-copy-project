import {cart, addToCart  } from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';



loadProducts(renderProductsGrid);


function renderProductsGrid()
{
    let productsHTML = '';
    const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  // If a search exists in the URL parameters,
  // filter the products that match the search.
  if (search) {
    filteredProducts = products.filter((product) => {
        let matchingKeyword = false;

        product.keywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(search.toLowerCase())) {
            matchingKeyword = true;
          }
        });
  
        return matchingKeyword ||
          product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  filteredProducts.forEach((product) => 
    {
        productsHTML += //13) HTML generation: this HTML creates one item on the amazon webpage. Product is the array that is being looped through for each object (has all item info) info to put into their respective place within this HTML. All the HTML is being stacked on productsHTML which will represent all the items on the webpage
        `     
            <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">
            <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
            </div>

            <div class="product-price">
            ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
            Add to Cart
            </button>
            </div>
        `;
    });

    document.querySelector('.products-grid').innerHTML = productsHTML;


    function updateCartQuantity()
    {
        // cart is the array. The array holds objects that hold productName and quantity. Item is a paramter that represents the object variabe. So essentially the for loop is looping the array of objects, and passing each object through item. productName represents the name of the amazon you clicked add to cart on. The for loop just checks if its already in the array (called cart). If it does matchingItem is going to equal the object and its quantity will be increased (matchingItem will equal a new product everytime add to cart is pressed on a different product but item should do the same thing so idk why they made matchingItem). If not the new object will be pushed into the array.  
            

        let cartQuantity = 0;
        cart.forEach((cartItem) => 
        {
            cartQuantity += cartItem.quantity;
        });
        document.querySelector('.cart-quantity').innerHTML = cartQuantity;
    }
    document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => 
        {
            
            const productId = button.dataset.productId;
            addToCart(productId);
            updateCartQuantity();
            
    //you cant just pull the object info by clicking on the items button. This is because there is no way to distinguish a button from item1 from item2. IOW, we can't link the buttons to an object. However, as we are looping thru the buttons, say we are on item 2 button. Still no link between button and item2 object info. However through the data attribute, we can link a product ID with the button and retrieve the product ID which we can push to the cart array. 
        });
    });

    document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });
    //once again just using querySelectorAll isnt enough to target all the buttons with addEventListeners. YOu have to use a for loop. 
}