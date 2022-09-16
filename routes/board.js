// @ts-check
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://kkangji:qwe123@kdt.u71doty.mongodb.net/?retryWrites=true&w=majority';
// board 라우터로 들어갑니다

const express = require('express');

const router = express.Router();

const mongoClient = require('./mongo');

function isLogin(req, res, next) {
  if (req.session.login || req.user) {
    next();
  } else {
    res.status(300);
    res.send('로그인 해주세요.<br><a href="/login">로그인 페이지로 이동</a>');
  }
}

router.get('/', isLogin, async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('board');
  const BOARD = await cursor.find({}).toArray();
  const boardLen = BOARD.length;
  res.render('board', {
    BOARD,
    boardCounts: boardLen,
    userId: req.session.userId ? req.session.userId : req.user.id,
  });
});

router.get('/write', (req, res) => {
  // 글 쓰기 모드로 이동
  res.render('write');
  // 미들 웨어 처리
});
router.post('/write', async (req, res) => {
  // 글 추가 기능 수행
  if (req.body.title && req.body.content) {
    const newBoard = {
      id: req.session.userId,
      title: req.body.title,
      content: req.body.content,
    };
    const client = await mongoClient.connect();
    const cursor = client.db('kdt1').collection('board');
    await cursor.insertOne(newBoard);
    res.redirect('/board');
    // MongoClient.connect(uri, (err, db) => {
    //   const data = db.db('kdt1').collection('board');

    //   data.insertOne(newBoard, (err, result) => {
    //     res.redirect('/board');
    //   });
    // });
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
router.get('/modify/title/:title', isLogin, async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('board');
  const selectedBoard = await cursor.findOne({
    title: req.params.title,
  });
  res.render('modify', { selectedBoard });
  // 글 수정 모드로 이동
  // MongoClient.connect(uri, (err, db) => {
  //   const data = db.db('kdt1').collection('board');
  //   data.findOne({ title: req.params.title }, (err, result) => {
  //     if (err) {
  //       throw err;
  //     } else {
  //       const selectedBoard = result;
  //     }
  //   });
  // });
});

router.post('/modify/title/:title', isLogin, async (req, res) => {
  // 글 수정 기능 수행
  if (req.body.title && req.body.content) {
    const client = await mongoClient.connect();
    const cursor = client.db('kdt1').collection('board');
    await cursor.updateOne(
      { title: req.params.title },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
        },
      }
    );
    res.redirect('/board');
    // MongoClient.connect(uri, (err, db) => {
    //   const data = db.db('kdt1').collection('board');

    //   data.updateOne(
    // { title: req.params.title },
    // {
    //   $set: {
    //     title: req.body.title,
    //     content: req.body.content,
    //   },
    // },
    //     (err, result) => {
    //       if (err) {
    //         throw err;
    //       } else {
    //         res.redirect('/board');
    //       }
    //     }
    //   );
    // });
  } else {
    const err = new Error('요청 값이 없습니다');
    err.statusCode = 404;
    throw err;
  }
});

// 특정 title을 가진 글 삭제
router.delete('/delete/title/:title', isLogin, async (req, res) => {
  // 글 삭제 기능 수행
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('board');
  const result = await cursor.deleteOne({ title: req.params.title });
  //res.redirect('/board');
  // MongoClient.connect(uri, (err, db) => {
  //   const data = db.db('kdt1').collection('board');

  //   data.deleteOne({ title: req.params.title }, (err, result) => {
  //     if (err) {
  //       res.end('해당 데이터가 없습니다');
  //     } else {
  //       res.send('삭제 완료');
  //     }
  //   });
  // });
  if (result.acknowledged) {
    res.send('삭제완료');
  } else {
    const err = new Error('삭제 실패');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
