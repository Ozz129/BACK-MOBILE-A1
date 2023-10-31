const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const app = express();

const url = 'mongodb+srv://ozz129:jRotj3sf3IkQRF3E@cluster0.xms2qxx.mongodb.net/?retryWrites=true&w=majority';
let db;
let client;

// Middleware para manejar errores globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

app.use(cors()); // Puedes configurar cors como necesites
app.use(express.json());

// Iniciar conexión a MongoDB al arrancar el servidor
const connectToMongo = async () => {
  client = new MongoClient(url);
  await client.connect();
  db = client.db('great_fitness');
};

connectToMongo().then(() => {
  app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 3000');
  });
});
