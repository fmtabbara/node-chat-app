const expect = require('expect');
const { isRealString } = require('./validation');

describe('Test isRealString function', () => {
  it('should reject non-string values', () => {
    const res = isRealString(1234);

    expect(res).toBe(false);
  });

  it('should reject empty or all-space submissions', () => {
    const res = isRealString('    ');

    expect(res).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    const res = isRealString('Pete Sampras');

    expect(res).toBe(true);
  });
});
