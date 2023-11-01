const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://ozz129:jRotj3sf3IkQRF3E@cluster0.xms2qxx.mongodb.net/?retryWrites=true&w=majority';
let db;

const connectToMongo = async () => {
  const client = new MongoClient(url);
  await client.connect();
  db = client.db('great_fitness');
};

exports.handler = async (event, context) => {
  await connectToMongo();
  
  const body = JSON.parse(event.body);
  const collection = db.collection('users');
  const documentos = await collection.insertOne(body);
  
  return {
    statusCode: 200,
    body: JSON.stringify(documentos)
  };
};
