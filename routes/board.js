// @ts-check

// board 라우터로 들어갑니다

const express = require('express');

const router = express.Router();

// title ,content 가지는 BOARD

const BOARD = [
  {
    title: '가나다',
    content: '라마',
  },
  {
    title: '1234',
    contet: '5678',
  },
];
router.get('/', (req, res) => {
  const boardLen = BOARD.length;
  res.render('board', { BOARD, boardCounts: boardLen });
});
router.get('/modify', (req, res) => {
  // res.send('hi');
  res.render('modify', { BOARD });
});

// 특정 title을 가진 글 삭제
router.delete('/:title', (req, res) => {
  const arrIndex = BOARD.findIndex((board) => board.title === req.params.title);
  if (arrIndex !== -1) {
    BOARD.splice(arrIndex, 1);
    res.send('게시글 삭제 완료');
  } else {
    const err = new Error('게시글을 찾지 못했습니다');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
