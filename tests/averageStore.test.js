const AverageStore = require('../src/averageStore');

describe('AverageStore', () => {
  let store;
  beforeEach(() => { store = new AverageStore(); });

  test('returns the number itself on first add', () => {
    expect(store.add(10)).toBe(10);
  });

  test('computes running average across calls', () => {
    store.add(10);
    expect(store.add(20)).toBe(15);
    expect(store.add(30)).toBe(20);
  });

  test('handles negatives and decimals', () => {
    store.add(-5);
    expect(store.add(2.5)).toBeCloseTo(-1.25);
  });

  test.each([['abc'], [NaN], [Infinity], [null], [undefined]])(
    'rejects invalid value %p',
    (v) => { expect(() => store.add(v)).toThrow(TypeError); }
  );

  test('reset clears state', () => {
    store.add(10);
    store.reset();
    expect(store.add(4)).toBe(4);
  });
});
