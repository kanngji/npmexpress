// @ts-check

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://kkangji:qwe123@kdt.u71doty.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  await client.connect();

  const users = client.db('kdt1').collection('users');

  // 데이터 초기화
  await users.deleteMany({});
  await users.insertMany([
    {
      name: 'pororo',
      age: 5,
    },
    {
      name: 'loopy',
      age: 6,
    },
    {
      name: 'crong',
      age: 4,
    },
  ]);

  // 하나만 넣기
  //   await users.insertOne({
  //     name: 'pproro',
  //     age: 5,
  //   });

  //   await users.deleteMany({
  //     age: { $gte: 5 },
  //   });

  await users.updateMany(
    {
      age: { $gte: 5 },
    },
    {
      $set: {
        old: 'yes',
      },
    }
  );

  const data = users.find({
    name: 'loopy',
  });
  console.log(data);
  const arr = await data.toArray();

  // 친숙한 json 형태의 데이터가 나온다
  console.log(arr);

  // db에 선언된거 다 찾아와라
  //   const data = users.find({});
  //   const arr = await data.toArray();

  console.log(arr);

  await client.close();
}

main();
