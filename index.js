const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const nggUrl = 'https://games.crazygames.com/en_US/jump-guys/index.html?v=1.320';

const proxy = createProxyMiddleware({
  target: nggUrl,
  changeOrigin: true,
  secure: true,
  logLevel: 'debug',
  router: function(req) {
    if (req.headers.host === 'mathsspot.com') {
      req.headers['X-Forwarded-For'] = ''; 
      req.headers['X-Real-IP'] = '';
      req.headers['Via'] = '';
    }
    return nggUrl;
  }
});

app.use('/', proxy);

const port = process.env.PORT || 443;
app.listen(port, () => {
  console.log(`CybriaGG is running on port ${port}`);
});
