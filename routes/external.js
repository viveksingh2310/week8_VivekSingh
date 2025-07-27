const express = require('express');
const https = require('https');
const router = express.Router();

router.get('/', (req, res, next) => {
  https.get('https://jsonplaceholder.typicode.com/users', (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      try {
        const json = JSON.parse(data);
        res.json(json);
      } catch (err) {
        next(err);
      }
    });
  }).on('error', (err) => {
    next(err);
  });
});

module.exports = router;
