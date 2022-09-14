// @ts-check

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://kkangji:qwe123@kdt.u71doty.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
