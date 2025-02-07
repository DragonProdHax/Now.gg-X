import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const nggUrl = 'https://embed.su/';

const proxy = createProxyMiddleware({
  target: nggUrl,
  changeOrigin: true,
  secure: true,
  logLevel: 'debug',
  selfHandleResponse: true, // Enable response modification
  onProxyRes: (proxyRes, _, res) => {
    let body = '';

    proxyRes.on('data', (chunk) => {
      body += chunk.toString();
    });

    proxyRes.on('end', () => {
      if (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].includes('text/html')) {
        // Inject alert script into HTML response
        body = body.replace('</body>', '<script>alert("hi")</script></body>');
      }
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      res.end(body);
    });
  }
});

app.use('/', proxy);

const port = process.env.PORT || 7892;
app.listen(port, () => {
  console.log(`CybriaGG is running on port ${port}`);
});
