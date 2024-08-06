import { sequelize } from '@planetx/models'

import winston from './winston.helper'

sequelize.authenticate()
  .then(() => winston.info('database connected'))
  .catch((err) => winston.error('unable to connect to database', err))

export default sequelize
