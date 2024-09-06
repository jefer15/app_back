const express = require('express');
require('dotenv').config({ path: './env/.env' });
const cors = require('cors');
const path = require('path');
const registerApiRouter = require('./components');
const config = require('./config/config')
require('./db/config');
const app = express();
http = require('http').Server(app)

const optionsCors = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};

app.use(cors(optionsCors));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());


registerApiRouter(app);

app.use('*', express.static(
    path.join(__dirname, '/public/'),
    {
      etag: true, // Just being explicit about the default.
      lastModified: true, // Just being explicit about the default.
      setHeaders: (res, pathD) => {
        const hashRegExp = /\.[0-9a-f]{8}\./;
        if (pathD.endsWith('.html')) {
          // All of the project's HTML files end in .html
          res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
          res.header('Expires', '-1');
          res.header('Pragma', 'no-cache');
        } else if (pathD.endsWith('.css')) {
          // All of the project's HTML files end in .html
          res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
          res.header('Expires', '-1');
          res.header('Pragma', 'no-cache');
        } else if (hashRegExp.test(pathD)) {
          // If the RegExp matched, then we have a versioned URL.
          res.setHeader('Cache-Control', 'max-age=31536000');
        }
      },
    },
  ));

  http.listen(config.port, () => {
    console.log(`Server is running in port ${config.port}`);
});

module.exports = app;
