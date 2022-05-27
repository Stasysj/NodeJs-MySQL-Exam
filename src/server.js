const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const billRoutes = require('./routes/billRoutes');
const groupRoutes = require('./routes/groupRoutes');

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
app.use('/api/', accountRoutes);
app.use('/api/', billRoutes);
app.use('/api/', groupRoutes);

// -404
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});
// ------------------------------------------------
app.listen(PORT, () => console.log('Server is running on port', PORT));
