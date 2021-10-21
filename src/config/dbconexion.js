const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/dados', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('conexion establecida con MongoDB'))
  .catch((error) =>
    console.error('No se ha podido conectar con MongoDB:', error.message)
  );
