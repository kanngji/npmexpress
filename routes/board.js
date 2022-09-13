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
router.get('/write', (req, res) => {
  res.render('write');
});
router.post('/', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.title) {
      const newBoardPost = {
        title: req.query.title,
        content: req.query.content,
      };
      BOARD.push(newBoardPost);
      res.redirect('/');
    } else {
      const err = new Error('unexpected Query');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    const arrIndex = BOARD.findIndex((board) => req.body.title === board.title);

    if (req.body.title && req.body.content) {
      const newBoardPost = {
        title: req.body.title,
        content: req.body.content,
      };
      BOARD.push(newBoardPost);
      res.redirect('/');
    } else if (req.body.title && req.body.content) {
      const modiPost = {
        title: req.body.title,
        content: req.body.content,
      };
      BOARD[arrIndex] = modiPost;
      res.redirect('/');
    } else {
      const err = new Error('unexpected form data');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('no data');
    err.statusCode = 404;
    throw err;
  }
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

router.get('/modify/:title', (req, res) => {
  const arrIndex = BOARD.findIndex((board) => board.title === req.params.title);
  res.render('modify', { BOARD, arrIndex });
});

module.exports = router;
