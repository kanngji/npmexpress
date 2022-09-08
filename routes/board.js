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
router.get('/modify/:title', (req, res) => {
  const boardData = BOARD.find((board) => board.title === req.params.title);
  if (boardData) {
    res.render('modify');
  } else {
    const err = new Error('해당하는 title이 없습니다');
    err.statusCode = 404;
    throw err;
  }
});
router.put('/:title', (req, res) => {
  // 일단 게시글 제목만 있으면 수정할수 있게
  if (req.query.title) {
    const boardData = BOARD.find((board) => board.title === req.params.title);
    if (boardData) {
      const arrIndex = BOARD.findIndex(
        (board) => board.title === req.params.title
      );
      const modifyBoard = {
        title: req.query.title,
        content: req.query.content,
      };
      BOARD[arrIndex] = modifyBoard;
      res.send('게시글 수정 완료');
    } else {
      const err = new Error('해당 게시글을 찾을 수 없습니다');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('게시글이 수정되기전 양식을 확인해주세요');
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

module.exports = router;
