const express = require('express');
const path = require('path');

const index = path.join(__dirname, '../dist/index.html');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(index);
});

app.listen(port);
