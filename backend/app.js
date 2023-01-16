require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const auth = require('./middlewares/auth');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const { login, createUser } = require('./controllers/user');
const { NotFoundError } = require('./errors/notFoundError');
const { STATUS_MESSAGE } = require('./utils/STATUS_MESSAGE');
const errorHandler = require('./middlewares/errorHandler');
const { validateSignup, validateSignin } = require('./middlewares/celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const { DATABASE__URL } = process.env;
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect(DATABASE__URL, {
  useNewUrlParser: true,
});
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateSignin, login);
app.post('/signup', validateSignup, createUser);

app.use('/', auth, usersRoute);
app.use('/', auth, cardsRoute);

app.use('*', () => {
  throw new NotFoundError(STATUS_MESSAGE.PAGE_NOT_FOUND_MESSAGE);
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
