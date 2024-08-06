import './helpers/dotenv.helper'

import app from './app'
import winston from './helpers/winston.helper';

const port = process.env.SERVICE_PORT;

app.listen(port, () => {
  winston.info(`Mobile Service Authen listening at: http://localhost:${port}`);
});
