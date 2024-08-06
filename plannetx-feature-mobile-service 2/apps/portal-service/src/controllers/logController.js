const { nanoid } = require("nanoid");
const { ValidationError } = require("express-validation");
const dayjs = require("dayjs");

const httpError = require("../constants/errors/httpError");

const winston = require("../helpers/winston");
const { HttpError, ServiceError } = require("../helpers/error");

const ENVIRONMENT = process.env.ENVIRONMENT;

exports.createRequestLog = () => (req, res, next) => {
  req.requestTime = dayjs();
  req.requestId = nanoid();

  winston.info(
    "Request " +
      `${req.requestId} ` +
      `${req.method} ` +
      `${req.baseUrl}${req.path} ` +
      `${req.ip} ` +
      `${req.headers["user-agent"]}`,
    {
      exchange: "Request",
      method: req.method,
      path: req.baseUrl + req.path,
      ip: req.ip,
      requestUID: req.requestId,
      request: {
        headers: req.headers,
        query: req.query,
        body: req.body,
      },
    }
  );
  next();
};

exports.createResponseLog = () => (req, res, next) => {
  const responseTime = dayjs().diff(req.requestTime, "milliseconds");

  winston.info(
    "Response " +
      `${req.requestId} ` +
      `${req.method} ` +
      `${req.baseUrl}${req.path} ` +
      `${res.statusCode} ` +
      `${responseTime}ms`,
    {
      exchange: "Response",
      method: req.method,
      path: req.baseUrl + req.path,
      requestUID: req.requestId,
      response: {
        status: res.statusCode,
        time: responseTime,
        timeUnit: "ms",
        body: req.response,
      },
    }
  );
  next();
};

exports.createErrorLog = () => (err, req, res, next) => {
  const responseTime = dayjs().diff(req.requestTime, "milliseconds");
  const language = req.cookies ? req.cookies.language || "en" : "en";

  if (err instanceof ValidationError) {
    err.status = 400;
    err.resCode = "9999";
    err.resDesc = {
      en: "Validation Error",
      th: "Validation Error",
    };
    err.payload = ENVIRONMENT === "development" ? { details: err.details } : {};
  } else if (!(err instanceof ServiceError) && !(err instanceof HttpError)) {
    console.error(err);
    err = new HttpError(httpError.ERR_HTTP_500);
  }

  req.response = {
    res_code: err.resCode,
    res_desc: err.resDesc[language],
    ...err.payload,
  };
  res.status(err.status).json(req.response);

  winston.error(
    "Response " +
      `${req.requestId} ` +
      `${req.method} ` +
      `${req.baseUrl}${req.path} ` +
      `${res.statusCode} ` +
      `${responseTime}ms | ` +
      `${err.resCode} ` +
      `${err.resDesc[language]}`,
    {
      exchange: "Response",
      method: req.method,
      path: req.baseUrl + req.path,
      requestUID: req.requestId,
      response: {
        status: res.statusCode,
        time: responseTime,
        timeUnit: "ms",
        body: req.response,
      },
      error: {
        ...err,
        stack: err.stack,
      },
    }
  );
};
