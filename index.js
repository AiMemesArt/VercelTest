const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');

const app = express();

// Enable body Parser

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set static folder

app.use(express.static(path.join(__dirname, 'public')));

// TODO: disable CORS in production
app.use(
  cors({
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar', 'Authorization'],
  })
);

app.use('/openai', require('./routes/openaiRoutes'));
app.listen(port, () =>
  console.log(`Server started on port ${port}
   Meme Generator oWo is ON`)
);
