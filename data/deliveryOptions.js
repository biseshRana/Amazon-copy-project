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