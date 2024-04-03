let productsHTML = '';
products.forEach((product) => 
{
    productsHTML += 
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
            src="images/ratings/rating-${product.rating.stars *10}.png">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
        <select>
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

document.querySelectorAll('.js-add-to-cart').forEach((button) => 
{
    button.addEventListener('click', () => 
    {
        const productId = button.dataset.productId;

        let matchingItem;
        // cart is the array. The array holds objects that hold productName and quantity. Item is a paramter that represents the object variabe. So essentially the for loop is looping the array of objects, and passing each object through item. productName represents the name of the amazon you clicked add to cart on. The for loop just checks if its already in the array (called cart). If it does matchingItem is going to equal the object and its quantity will be increased (matchingItem will equal a new product everytime add to cart is pressed on a different product but item should do the same thing so idk why they made matchingItem). If not the new object will be pushed into the array.  
        cart.forEach((item) => 
        {
            if (productId === item.productId)
            {
                matchingItem = item;
            }
        });
        if (matchingItem)
            {
                matchingItem.quantity += 1;
            } 
         else 
            {
                cart.push(
                    {
                        productId: productId,
                        quantity: 1
                    });
            }
            console.log(cart);
    });
});