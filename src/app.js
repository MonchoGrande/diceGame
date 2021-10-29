const express = require('express');
const routes = require('./routes/routes');
require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use(routes);

app.listen(port, () => {
  console.log(`El servidor está inicializado en el puerto ${port}`);
});
