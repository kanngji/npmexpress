// @ts-check

const express = require('express');

const router = express.Router();

// title, content를 가지는 배열
const POST = [
  {
    title: '가',
    content: '가나다',
  },
  {
    title: 'a',
    content: 'abc',
  },
];
// 글 전체 목록 조회
router.get('/', (req, res) => {
  const postLen = POST.length;
  res.render('postsindex', { POST, postCounts: postLen });
});
// 특정 title 을 가진 글 조회
router.get('/:title', (req, res) => {
  const postData = POST.find((post) => post.title === req.params.title);
  if (postData) {
    res.send(postData);
  } else {
    const err = new Error('해당하는 title이 없습니다');
    err.statusCode = 404;
    throw err;
  }
});

// 새로운 글 작성
router.post('/', (req, res) => {
  if (req.query.title && req.query.content) {
    const newPost = {
      title: req.query.title,
      content: req.query.content,
    };
    POST.push(newPost);
    res.send('게시글 등록 완료');
  } else {
    const err = new Error('게시글 등록이 되지 않았습니다');
    err.statusCode = 404;
    throw err;
  }
});

// 특정 title 을 가진 글 수정
router.put('/:title', (req, res) => {
  if (req.query.title && req.query.content) {
    const postData = POST.find((post) => post.title === req.params.title);
    if (postData) {
      const arrIndex = POST.findIndex(
        (post) => post.title === req.params.title
      );
      const modifyPost = {
        title: req.query.title,
        content: req.query.content,
      };
      POST[arrIndex] = modifyPost;
      res.send('게시글 수정 완료');
    } else {
      const err = new Error('해당 게시글을 찾을수 없습니다.');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('게시글이 수정되기전 양식을 확인해주세요.');
    err.statusCode = 404;
    throw err;
  }
});

// 특정 title 을 가진 글 삭제
router.delete('/:title', (req, res) => {
  const arrIndex = POST.findIndex((post) => post.title === req.params.title);
  if (arrIndex !== -1) {
    POST.splice(arrIndex, 1);
    res.send('게시글 삭제 완료');
  } else {
    const err = new Error('게시글을 찾지 못했습니다');
    err.statusCode = 404;
    throw err;
  }
});
module.exports = router;
