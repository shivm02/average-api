const createApp = require('./app');

const PORT = process.env.PORT || 3000;

createApp().listen(PORT, () => {
  console.log(`Average API listening on http://localhost:${PORT}`);
});
