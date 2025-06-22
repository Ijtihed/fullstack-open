const mongoose = require('mongoose')
const app = require('./src/app')
const config = require('./src/utils/config')
const logger = require('./src/utils/logger')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')

    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`)
    })
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  }) 