const mongoose = require('mongoose');

mongoose
  .connect(
    `${process.env.PROTOCOL}://${process.env.URL}:${process.env.DB_PORT}/${process.env.DATABASE_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log('conexion establecida con MongoDB'))
  .catch((error) =>
    console.error('No se ha podido conectar con MongoDB:', error.message)
  );
