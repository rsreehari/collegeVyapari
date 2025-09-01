import { formatDate } from '../android/app/src/utils/formatDate';

describe('formatDate', () => {
  it('formats date as expected', () => {
    const date = new Date('2025-09-01');
    expect(formatDate(date)).toBe('1 Sept 2025');
  });
});
