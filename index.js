const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const nggUrl = 'https://schoprox.com/__cpi.php?s=UkQ2YXlSaWJuc3ZoeGR2dG04WW9LaVI4SHpUSmNUS1RKbFRwL0hDcDlkeUtlRUNMMGxXR2lselg3NjAxcG4wQVlhNkIycjNBdllDWEVaek9YTThWUkQvdUY2OENDdjVNUzhGNHIvTXZVMjA9&r=aHR0cHM6Ly9zY2hvcHJveC5jb20vP19fY3BvPWFIUjBjSE02THk5M2QzY3VlVzkxZEhWaVpTNWpiMjA%3D&__cpo=1';

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
