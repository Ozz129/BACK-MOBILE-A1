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
  
  const { type } = event.queryStringParameters;

  const collection = db.collection('general');
  const results = await collection.find({ type }).toArray();

  if (!results) {
    return {
      statusCode: 404,
      body: JSON.stringify({ msg: 'Contenido no encontrado' })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(results)
  };
};
