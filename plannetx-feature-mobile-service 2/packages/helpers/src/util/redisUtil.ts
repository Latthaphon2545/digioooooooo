import { Logger } from 'winston'
import { createClient } from 'redis'

export const createRedisClient = (host: string, port: number, logger: Logger) => {
  const redisClient = createClient({
    socket: {
      host,
      port,
      reconnectStrategy: () => 3000
    }
  })

  redisClient.on('error', (err: any) => logger.error('redis error' + err))

  redisClient.connect()
    .then(() => logger.info('Redis Server Connected'))
    .catch(console.error)

  return redisClient
}
