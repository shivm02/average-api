const request = require('supertest');
const createApp = require('../src/app');

describe('POST /average', () => {
  let app;
  beforeEach(() => { app = createApp(); });

  test('returns the average of all numbers received so far', async () => {
    let res = await request(app).post('/average').send({ number: 10 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ average: 10, count: 1 });

    res = await request(app).post('/average').send({ number: 20 });
    expect(res.body).toEqual({ average: 15, count: 2 });

    res = await request(app).post('/average').send({ number: 30 });
    expect(res.body).toEqual({ average: 20, count: 3 });
  });

  test('accepts zero and negative numbers', async () => {
    await request(app).post('/average').send({ number: 0 });
    const res = await request(app).post('/average').send({ number: -10 });
    expect(res.body.average).toBe(-5);
  });

  test.each([
    [{}],
    [{ number: 'abc' }],
    [{ number: '5' }],
    [{ number: null }],
    [{ other: 1 }],
  ])('returns 400 for invalid body %j', async (body) => {
    const res = await request(app).post('/average').send(body);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('returns 400 for malformed JSON', async () => {
    const res = await request(app)
      .post('/average')
      .set('Content-Type', 'application/json')
      .send('{bad json');
    expect(res.status).toBe(400);
  });

  test('invalid requests do not affect the average', async () => {
    await request(app).post('/average').send({ number: 10 });
    await request(app).post('/average').send({ number: 'x' });
    const res = await request(app).post('/average').send({ number: 20 });
    expect(res.body).toEqual({ average: 15, count: 2 });
  });
});
