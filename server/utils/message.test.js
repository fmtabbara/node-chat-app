const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Fouad';
    const text = 'This is a test message';
    const res = generateMessage(from, text);

    // expect(res.from).toBe(name);
    // expect(res.text).toBe(text);
    expect(res).toMatchObject({
      from,
      text,
      createdAt: res.createdAt
    });
    expect(typeof res.createdAt).toBe('number');
  });
});
