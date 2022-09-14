// @ts-check

// board 라우터로 들어갑니다

const express = require('express');

const router = express.Router();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://kkangji:qwe123@kdt.u71doty.mongodb.net/?retryWrites=true&w=majority';

// title ,content 가지는 BOARD

// const BOARD = [
//   {
//     title: '가나다',
//     content: '라마',
//   },
//   {
//     title: '1234',
//     contet: '5678',
//   },
// ];
router.get('/', (req, res) => {
  // 글 전체 목록 보여주기
  const boardLen = BOARD.length;
  res.render('board', { BOARD, boardCounts: boardLen });
});
router.get('/write', (req, res) => {
  // 글 쓰기 모드로 이동
  res.render('write');
  // 미들 웨어 처리
});
router.post('/write', (req, res) => {
  // 글 추가 기능 수행
  if (req.body.title && req.body.content) {
    const newBoard = {
      title: req.body.title,
      content: req.body.content,
    };
    BOARD.push(newBoard);
    res.redirect('/board');
  } else {
    const err = new Error('데이터가 없습니다.');
    err.statusCode = 404;
    throw err;
  }
  // if (Object.keys(req.query).length >= 1) {
  //   if (req.query.title) {
  //     const newBoardPost = {
  //       title: req.query.title,
  //       content: req.query.content,
  //     };
  //     BOARD.push(newBoardPost);
  //     res.redirect('/');
  //   } else {
  //     const err = new Error('unexpected Query');
  //     err.statusCode = 404;
  //     throw err;
  //   }
  // } else if (req.body) {
  //   const arrIndex = BOARD.findIndex((board) => req.body.title === board.title);
  //   if (req.body.title && req.body.content) {
  //     const newBoardPost = {
  //       title: req.body.title,
  //       content: req.body.content,
  //     };
  //     BOARD.push(newBoardPost);
  //     res.redirect('/');
  //   } else if (req.body.title && req.body.content) {
  //     const modiPost = {
  //       title: req.body.title,
  //       content: req.body.content,
  //     };
  //     BOARD[arrIndex] = modiPost;
  //     res.redirect('/');
  //   } else {
  //     const err = new Error('unexpected form data');
  //     err.statusCode = 404;
  //     throw err;
  //   }
  // } else {
  //   const err = new Error('no data');
  //   err.statusCode = 404;
  //   throw err;
  // }
});
router.get('/modify/title/:title', (req, res) => {
  // 글 수정 모드로 이동
  const arrIndex = BOARD.findIndex((board) => board.title === req.params.title);
  const selectedBoard = BOARD[arrIndex];
  res.render('modify', { selectedBoard });
});

router.post('/modify/title/:title', (req, res) => {
  // 글 수정 기능 수행
  if (req.body.title && req.body.content) {
    const arrIndex = BOARD.findIndex(
      (board) => board.title === req.params.title
    );
    BOARD[arrIndex].title = req.body.title;
    BOARD[arrIndex].content = req.body.content;
    res.redirect('/board');
  } else {
    const err = new Error('요청 값이 없습니다');
    err.statusCode = 404;
    throw err;
  }
});

// 특정 title을 가진 글 삭제
router.delete('/delete/title/:title', (req, res) => {
  // 글 삭제 기능 수행
  const arrIndex = BOARD.findIndex((board) => board.title === req.params.title);
  if (arrIndex !== -1) {
    BOARD.splice(arrIndex, 1);
    res.send('삭제 완료');
  } else {
    const err = new Error('해당 제목을 가진 글이 없습니다');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
