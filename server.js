const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/logs', require('./routes/logs'));
app.use('/api/techs', require('./routes/techs'));

// check if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  // get build folder data
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// declare port
const PORT = process.env.PORT || 5000;

// run backend
app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}.`);
});
