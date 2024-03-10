/* eslint-disable linebreak-style */
/* eslint-disable indent */
const app = require('./app') 
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
