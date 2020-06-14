const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const ISSUER = process.env.ISSUER;

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${ISSUER}.well-known/jwks.json`,
  }),
  audience: process.env.AUDIENCE,
  issuer: ISSUER,
  algorithm: ['RS256'],
});

module.exports = jwtCheck;
