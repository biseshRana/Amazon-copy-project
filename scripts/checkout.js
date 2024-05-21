import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from '../zpractice.js';

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();