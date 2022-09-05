// @ts-check

const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 4000;

app.use('/', async (req, res, next) => {
  console.log('Middleware 1');
  req.reqTime = new Date();
  req.fileContent = await fs.promises.readFile('package.json', 'utf-8');
  next();
});

app.use((req, res, next) => {
  console.log('Middleware 2');
  console.log(req.fileContent);
  res.send(`Requested at ${req.reqTime}`);
});

app.listen(PORT, () => {
  console.log(`the express server is running at port: ${PORT}`);
});
