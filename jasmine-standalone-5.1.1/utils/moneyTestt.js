import {formatCurry} from '../../scripts/utils/money';

describe('test suite: formatCurry', () => {
  it('converts cents into dollars', () => {
    expect(formatCurry(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurry(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => 
    {
        expect(formatCurry(2000.5)).toEqual('20.01');
    });
});
