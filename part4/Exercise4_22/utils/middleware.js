const logger = require('./logger')
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
      if (authorization && authorization.startsWith('bearer ')) {
        return authorization.replace('bearer ', '')
      }else{
        return null
      }
  
}


async function userExtractor(request, response, next) {
  try {
    const token = request.token;
    if (!token) {
      return response.status(401).json({ error: 'Token missing' });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Invalid token' });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(401).json({ error: 'User not found' });
    }

    request.user = user;
    next();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}