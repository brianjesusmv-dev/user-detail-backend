require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('./server/config/cors');
const helmet = require('./server/config/helmet');
const rateLimiter = require('./server/config/rateLimit');
const logger = require('./server/utils/logger');

const userRoutes = require('./server/routes/api/v1/users.routes');
const errorHandler = require('./server/middlewares/errorHandler');

const PORT = process.env.PORT || 5001;

app.use(rateLimiter);
app.use(cors);
app.use(helmet);
app.use(logger);
app.use(express.json());

app.use('/api/v1/users', userRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
