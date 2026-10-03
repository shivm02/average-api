const express = require('express');
const AverageStore = require('./averageStore');

/**
 * Creates the Express application.
 * A fresh store is created per app so tests stay isolated.
 * @param {AverageStore} [store=new AverageStore()] - Storage for the running average.
 * @returns {import('express').Express} Configured Express app.
 */
function createApp(store = new AverageStore()) {
  const app = express();
  app.use(express.json());

  /**
   * POST /average
   * Body: { "number": <number> }
   * Response: { "average": <number>, "count": <number> }
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  app.post('/average', (req, res) => {
    const value = req.body && req.body.number;
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return res
        .status(400)
        .json({ error: 'Request body must be JSON like {"number": 5} with a finite number.' });
    }
    const average = store.add(value);
    return res.status(200).json({ average, count: store.count });
  });

  // Handles malformed JSON bodies.
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'Invalid JSON body.' });
    }
    return res.status(500).json({ error: 'Internal server error.' });
  });

  return app;
}

module.exports = createApp;
