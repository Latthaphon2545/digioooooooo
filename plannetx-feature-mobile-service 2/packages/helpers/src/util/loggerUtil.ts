import path from 'path'

import { Client, ClientOptions } from '@opensearch-project/opensearch'
import winston from 'winston'
import 'winston-daily-rotate-file'
import { ElasticsearchTransformer, ElasticsearchTransport } from 'winston-elasticsearch'

interface LoggerOption {
  dirname: string
  esOption?: {
    client: ClientOptions
    source: string
  }
}

export function createLogger (option: LoggerOption) {
  const transports: winston.transport[] = [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(info => `${info.level} [${info.timestamp}] ${info.message}`)
      )
    }),
    new winston.transports.DailyRotateFile({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      filename: path.join(option.dirname, '..', '..', 'logs', '%DATE%.json'),
      datePattern: 'YYYY-MM-DD',
      createSymlink: true
    })
  ]

  if (process.env.ES_CLIENT_NODE) {
    const esTransport = new ElasticsearchTransport({
      level: 'info',
      indexPrefix: `planetx-${process.env.APP_NAME}`,
      client: new Client({
        node: process.env.ES_CLIENT_NODE,
        ssl: { rejectUnauthorized: false },
        auth: {
          username: process.env.ES_CLIENT_USERNAME!,
          password: process.env.ES_CLIENT_PASSWORD!
        },
        agent: {
          maxFreeSockets: 10,
          maxSockets: 50
        }
      }) as any,
      transformer: (logData) => {
        const transformed = ElasticsearchTransformer(logData)
        return {
          ...transformed,
          environment: process.env.ENVIRONMENT || process.env.NODE_ENV
        }
      },
      
    })
    transports.push(esTransport)
  }

  const logger = winston.createLogger({ transports })
  return logger
}
