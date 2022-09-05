// @ts-check
const express = require('express');

const { link } = require('fs');

const app = express();

const PORT = 4000;

const userRouter = require('./routes/users');

const postsRouter = express.Router();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/users', userRouter);
app.use('/posts', postsRouter);
// css 문제 해결
app.use(express.static('public'));
// view 에서 없으면 js에서 찾아보렴

// app.get('/', (req, res) => {
//   res.send('GET method');
// });
// app.post('/', (req, res) => {
//   res.send('POST method');
// });
// app.put('/', (req, res) => {
//   res.send('PUT method');
// });
// app.delete('/', (req, res) => {
//   res.send('DELETE method');
// });

// app.get('/:email/:password/:name/:gender', (req, res) => {
//   console.log(req.params);
//   res.send(req.params);
// });

// app.get('/', (req, res) => {
//   const q = req.query;
//   if (q.email && q.pw && q.name && q.gender) {
//     res.send(req.query);
//   } else {
//     res.send('Unexpected');
//   }
// });

// err 핸들링 매개 변수 4개 모두 다 써 순서까지 써야함
app.use((err, req, res, next) => {
  // 서버 단
  console.log(err.stack);
  // 사용자 단
  res.status(err.statusCode);
  res.end(err.message);
});

app.listen(PORT, () => {
  console.log(`the express server is runnung at ${PORT}`);
});
