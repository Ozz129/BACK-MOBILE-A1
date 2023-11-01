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
  const { user, password } = body;
  const collection = db.collection('users');
  const results = await collection.findOne({ email: user });

  if (!results || results.password !== password) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Usuario o contraseña incorrectos.' })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ msg: 'Bienvenido' })
  };
};
