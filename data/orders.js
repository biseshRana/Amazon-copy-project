export const orders =JSON.parse(localStorage.getItem('orders')) || [];//if there is nothing saved in local storage it willl use the empty array

export function addOrder(order)//an object part of the array
{
    orders.unshift(order);//adds order to front of the array
    saveToStorage();
}

function saveToStorage() 
{
    localStorage.setItem('orders', JSON.stringify(orders));
}