const express = require('express');
const rendertron = require('rendertron-middleware');

const app = express();

// 🔥 Your site URL
const YOUR_SITE = 'https://revochamp.site';

// Bot detection
app.use(rendertron.makeMiddleware({
  proxyUrl: 'http://localhost:3000/render',
  userAgentPattern: /googlebot|bingbot|yandex|duckduckbot|baiduspider|facebookexternalhit|twitterbot|linkedinbot/i
}));

app.get('/render/*', async (req, res) => {
  const url = req.params[0];

  const browser = await require('puppeteer').launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  const html = await page.content();

  await browser.close();

  res.send(html);
});

app.listen(3000, () => {
  console.log('Rendertron running on port 3000');
});
