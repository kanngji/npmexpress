// @ts-check
const express = require('express');

const app = express();

// const { link } = require('fs');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoClient = require('./routes/mongo');

const PORT = 4000;

// express 기본 기능이야!
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'kangji',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// 패스포트
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: 'id',
      passwordField: 'password',
    },
    async (id, password, cb) => {
      const client = await mongoClient.connect();
      const userCursor = client.db('kdt1').collection('users');
      const idResult = await userCursor.findOne({ id });
      if (idResult !== null) {
        if (idResult.password === password) {
          cb(null, idResult);
        } else {
          cb(null, false, { message: '비밀번호가 틀렸습니다.' });
        }
      } else {
        cb(null, false, { message: '해당 id가 없습니다.' });
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const client = await mongoClient.connect();
  const userCursor = client.db('kdt1').collection('users');
  const result = await userCursor.findOne({ id });
  if (result !== null) cb(null, result);
});

const router = require('./routes/index');
const userRouter = require('./routes/users');
// 모듈 방식으로 posts.js를  라우팅
const postsRouter = require('./routes/posts');
const boardRouter = require('./routes/board');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', router);

app.use('/users', userRouter);
// 모듈 방식으로 posts.js를  라우팅
app.use('/posts', postsRouter);
// board 모듈 방식으로 board.js를 라우팅
app.use('/board', boardRouter);
// css 문제 해결
app.use('/register', registerRouter);
app.use('/login', loginRouter);
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
  res.status(err.statusCode || 500);
  res.end(err.message);
});

app.listen(PORT, () => {
  console.log(`the express server is runnung at ${PORT}`);
});
