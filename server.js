const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

// 🔥 Prerender endpoint
app.get('/render/*', async (req, res) => {
  const targetUrl = req.params[0];

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.goto(targetUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    const html = await page.content();

    await browser.close();

    res.send(html);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error rendering page');
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('Prerender service is running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Prerender running on port ${PORT}`);
});
