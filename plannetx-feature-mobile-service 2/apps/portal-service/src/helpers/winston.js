const path = require("path");

const winston = require("winston");
const WinstonCloudWatch = require("winston-cloudwatch");
const dayjs = require("dayjs");

require("winston-daily-rotate-file");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(
          (info) => `${info.level} [${info.timestamp}] ${info.message}`
        )
      ),
    }),
    new winston.transports.DailyRotateFile({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      filename: path.join(__dirname, "..", "..", "logs", "%DATE%.json"),
      datePattern: "YYYY-MM-DD",
      createSymlink: true,
    }),
    new WinstonCloudWatch({
      awsRegion: process.env.AWS_CLOUD_WATCH_REGION,
      logGroupName: process.env.AWS_CLOUD_WATCH_GROUP_NAME,
      logStreamName: () => dayjs().format("YYYY-MM-DD"),
      jsonMessage: true,
    }),
  ],
});

module.exports = logger;
