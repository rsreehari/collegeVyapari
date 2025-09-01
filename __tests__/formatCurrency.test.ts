import { formatCurrency } from '../android/app/src/utils/formatCurrency';

describe('formatCurrency', () => {
  it('formats INR correctly', () => {
    expect(formatCurrency(1000)).toBe('₹1,000');
  });
  it('formats USD correctly', () => {
    expect(formatCurrency(1000, 'USD')).toBe('$1,000');
  });
});
