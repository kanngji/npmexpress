// @ts-check

// 기본 라우터가 될 코드

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // res.cookie('alert', true, {
  //   // 한시간이 된다 1000 * 60 * 60
  //   expires: new Date(Date.now() + 1000 * 10),

  //   // 통신이 일어날때만 읽을수 있게 해주는 옵션
  //   httpOnly: true,
  // });
  // console.log(req.cookies.alert);

  res.render('index', { popup: req.cookies.popup });
});

router.post('/cookie', (req, res) => {
  res.cookie('popup', 'hide', {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
  });
  res.send('쿠키 생성 성공');
});

module.exports = router;
