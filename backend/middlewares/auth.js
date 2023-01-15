require('dotenv').config();
const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;
const { UnauthorizedError } = require('../errors/unauthorizedError');
const { STATUS_MESSAGE } = require('../utils/STATUS_MESSAGE');

module.exports = (req, res, next) => {
  const jwt = require('jsonwebtoken');
  const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JlNmMyN2JmMDJhZDJjNTg4NzZmOGUiLCJpYXQiOjE2NzM3OTc5MzQsImV4cCI6MTY3NDQwMjczNH0.Zqt6YezIf9wc59UWH4W9N6YBgz5pE5_Vpu-s4zFSS1Y'; // вставьте сюда JWT, который вернул публичный сервер
  const SECRET_KEY_DEV = '5cdd183194489560b0e6bfaf8a81541e'; // вставьте сюда секретный ключ для разработки из кода
  try {
    const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
    console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
  } catch (err) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log(
        '\x1b[32m%s\x1b[0m',
        'Всё в порядке. Секретные ключи отличаются'
      );
    } else {
      console.log(
        '\x1b[33m%s\x1b[0m',
        'Что-то не так',
        err
      );
    }
  }
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(STATUS_MESSAGE.UNAUTHORIZED_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(STATUS_MESSAGE.UNAUTHORIZED_MESSAGE);
  }

  req.user = payload;

  next();
};