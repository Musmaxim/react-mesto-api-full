const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const rateLimit = require('express-rate-limit')
const cors = require('cors');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error');
const { validateUser, validateLogin } = require('./middlewares/validations');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');
const {
  login,
  createUser,
} = require('./controllers/users');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
const { PORT = 3000 } = process.env;
const app = express();

app.use(limiter);

app.use(express.json());

app.use(requestLogger);

app.use(cors({
  origin: [
    'http://frontmus.students.nomoredomains.work',
    'https://frontmus.students.nomoredomains.work',
  ],
  methods: ['OPTIONS', 'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
}));

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true });

app.post('/signup', validateUser, createUser);

app.post('/signin', validateLogin, login);

app.use(auth);

app.use('/users', routerUser);

app.use('/cards', routerCards);

app.use(() => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
