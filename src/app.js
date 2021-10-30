const express = require('express');
require('dotenv').config();

const routes = require('./routes/routes');
const handlerError = require('./middlewares/handler-errors');
const port = process.env.PORT || 3000;

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use(routes);

//Not route handlerFound
app.use(handlerError.routeFoundHandler);

//Error handler
app.use(handlerError.errorHandler);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
