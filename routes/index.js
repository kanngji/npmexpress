// @ts-check

// 기본 라우터가 될 코드

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
