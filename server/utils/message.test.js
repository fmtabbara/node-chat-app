const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Admin';
    const lat = 1.5;
    const lon = 2.5;
    const res = generateLocationMessage(from, lat, lon);

    expect(res).toMatchObject({
      from,
      url: `http://www.google.com/maps?q=1.5,2.5`,
      createdAt: res.createdAt
    });
    expect(typeof res.createdAt).toBe('number');
  });
});
