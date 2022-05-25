const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');

// --------------------------------------------------
const app = express();

// --------------------------------------------------
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// ------------------------------------------------
app.get('/', (req, res) => {
  res.send('Gera pradzia');
});

// ------------------------------------------------
app.listen(PORT, () => console.log('Server is running on port', PORT));
