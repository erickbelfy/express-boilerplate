import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../../config/config';


/**
 *
 * TODO ERICKBELFY doc
 */
const user = {
  username: 'demo',
  password: 'express'
};

const MESSAGES = { AUTHENTICATION_ERROR: 'Authentication error' };

/**
 * TODO ERICKBELFY doc
 */

function login(req, res, next) {
  if (
         req.body.username === user.username
      && req.body.password === user.password
  ) {
    const token = jwt.sign({
      username: user.username
    }, config.jwtSecret);

    return res.json({
      token,
      username: user.username
    });
  }

  const err = new APIError(MESSAGES.AUTHENTICATION_ERROR, httpStatus.UNAUTHORIZED, true);
  return next(err);
}


/**
 * TODO ERICKBELFY doc
 */
function getRandomNumber(req, res) {
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber, MESSAGES };
