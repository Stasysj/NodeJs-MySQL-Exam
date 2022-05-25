const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const userRoutes = require('./routes/userRoutes');

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
// ------------------------------Routes---------------
app.use('/api/', userRoutes);
// -404
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});
// ------------------------------------------------
app.listen(PORT, () => console.log('Server is running on port', PORT));
