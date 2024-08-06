require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const compression = require("compression");
const dayjs = require("dayjs");

const httpError = require("./constants/errors/httpError");

const auditLogController = require("./controllers/auditLogController");
const authenController = require("./controllers/authenController");
const logController = require("./controllers/logController");

const passport = require("./helpers/passport");
const redis = require("./helpers/redis");
const winston = require("./helpers/winston");
const { HttpError } = require("./helpers/error");

const routers = require("./routers");

const ENVIRONMENT = process.env.ENVIRONMENT;
const HOSTNAME = process.env.HOSTNAME;
const PORT = Number(process.env.PORT);
const COOKIE_SECRET = process.env.COOKIE_SECRET;

const app = express();
const RedisStore = require("connect-redis")(session);

app.enable("trust proxy");
app.disable("x-powered-by");

app.use(compression());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    store: new RedisStore({ client: redis }),
    secret: COOKIE_SECRET,
    rolling: true,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
  res.header(
    "Strict-Transport-Security",
    "max-age=15778463; includeSubDomains; preload"
  );
  res.header("X-Content-Type-Options", "nosniff");
  res.header("X-Frame-Options", "DENY");
  res.header("X-XSS-Protection", "1; mode=block");
  res.cookie("expires", dayjs(req.session.cookie.expires).toISOString());
  next();
});

app.use(logController.createRequestLog());
app.use(authenController.authenticate());
app.use(routers);
app.use((req, res, next) => {
  if (!res.headersSent) {
    return next(new HttpError(httpError.ERR_HTTP_404));
  }
  return next();
});
app.use(auditLogController.createSuccessAuditLog());
app.use(auditLogController.createFailureAuditLog());
app.use(logController.createResponseLog());
app.use(logController.createErrorLog());

app.listen(PORT, HOSTNAME, () => {
  winston.info(
    `${ENVIRONMENT.charAt(0).toUpperCase() + ENVIRONMENT.slice(1)} Environment`
  );
  winston.info(`Service Started on ${PORT}`);
});
