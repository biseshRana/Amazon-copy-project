export function formatCurrency(priceCents)
{
    return (priceCents).toFixed(2);
}

export default formatCurrency;

export function formatCurry(priceCents)
{
   return (Math.round(priceCents) / 100).toFixed(2);
}

