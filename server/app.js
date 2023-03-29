const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ошибка сервера' });
});

const PORT = process.env.PORT || 3000;

let server;

function startServer() {
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

function stopServer() {
  server.close(() => {
    console.log('Server is stopped');
  });
}

module.exports = {
  app,
  startServer,
  stopServer
};
