const rendertron = require('rendertron');

const app = rendertron.makeRendertronServer({
  config: {
    timeout: 10000,
    maxConcurrentRenderers: 2,
    chromeFlags: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Rendertron running on port ${PORT}`);
});
