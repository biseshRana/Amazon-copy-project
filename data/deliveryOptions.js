import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays:7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    }, 
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }];//these 3 are the 3 delivery options for one product

 export function getDeliveryOption(deliveryOptionId)
{
    let deliveryOption;

        deliveryOptions.forEach((option) => { 
            if(option.id === deliveryOptionId)//15-6) essetially if cart array option id equals the one delivery array option has, then variable deliveryOption will equal the delivery array option. 
                {
                    deliveryOption = option;
                }
        
        });

        return deliveryOption || deliveryOptions[0];
} 

//exercise 15-l) My main mistakes were: 1. Not returning dateString and 2. not providing a parameter. You have to return dateString as it ensures sum will come out the function after its called, else all the variables made in the function stay in the function.  2. I think the only values that you don't have to pass are variables declared in the same file (not in function). Any array or object values have to be passed through a parameter even if in same file. Plus you have to think where the function is being called, since they are called in a file where the variables aren't declared, it makes sense for the varaiables to be passed through a parameter. 
function isWeekend(date) //returns true if a weekend
{
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}
export function calculateDeliveryDate(deliveryOption)
{
    let remainingDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();

    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day');

        if (!isWeekend(deliveryDate)) {
        remainingDays--;
        // This is a shortcut for:
        // remainingDays = remainingDays - 1;
        }
    }

    const dateString = deliveryDate.format(
        'dddd, MMMM D');

    return dateString;
}