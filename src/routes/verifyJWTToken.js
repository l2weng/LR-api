import jwt from 'jsonwebtoken';
import config from '../config';

export function verifyJWTToken() {
  return (req, res, next) => {
    const token = req.body.token || req.query.token || req.header('Authorization');

    if (req.method !== 'OPTIONS') {
      jwt.verify(token, config.auth.jwt.secret, (err, decoded) => {
        if (err) {
          return res.status(403).send({result: 'error', msg: 'Failed to authenticate token.'});
        }
        req.decoded = decoded;
      });
    }

    next()
  }
}
