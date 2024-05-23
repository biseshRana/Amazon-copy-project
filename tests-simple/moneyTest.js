import {formatCurrency, formatCurry} from '../scripts/utils/money.js';

console.log('Test Suite:formatCurrency')

console.log('converts cents into dollars');
if(formatCurry(2095) === '20.95')
    {
        console.log('passed');
    }
    else
    {
        console.log('failed');
    }

console.log('Works with zero');
if(formatCurry(0) === '0.00')
    {
        console.log('passed');
    }
    else
    {
        console.log('failed');
    }

console.log('Rounds up to the nearest cent');
if(formatCurry(2000.5) === '20.01')
    {
        console.log('passed');
    }
    else
    {
        console.log('failed');
    }