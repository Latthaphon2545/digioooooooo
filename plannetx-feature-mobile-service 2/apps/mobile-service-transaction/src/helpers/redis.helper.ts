import { createRedisClient } from '@planetx/helpers'
import winston from './winston.helper'

const redisClient = createRedisClient(process.env.REDIS_HOST!, Number(process.env.REDIS_PORT), winston)

export default redisClient
