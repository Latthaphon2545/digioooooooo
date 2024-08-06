const express = require("express");
const dayjs = require("dayjs");

dayjs.extend(require("dayjs/plugin/utc"));

const redis = require("./helpers/redis");
const sequelize = require("./helpers/sequelize");

const adjustmentRouter = require("./routers/adjustmentRouter");
const auditLogRouter = require("./routers/auditLogRouter");
const authenRouter = require("./routers/authenRouter");
const inpartnerRouter = require("./routers/inpartnerRouter");
const inbranchRouter = require("./routers/inbranchRouter");
const inagentRouter = require("./routers/inagentRouter");
const inmerchantRouter = require("./routers/inmerchantRouter");
const inportalRouter = require("./routers/inportalRouter");
const inuserRouter = require("./routers/inuserRouter");
const partnerRouter = require("./routers/partnerRouter");
const reportRouter = require("./routers/reportRouter");
const transactionRouter = require("./routers/transactionRouter");

const router = express.Router();
const serviceStart = dayjs();

const ENVIRONMENT = process.env.ENVIRONMENT;

router.get("/", async (req, res, next) => {
  const databaseStatus = await sequelize
    .authenticate()
    .then(() => "Connected")
    .catch(() => "Disconnected");

  console.log("Redis", redis.connected);

  res.json({
    requestUID: req.requestId,
    service: "Whalepay Portal Service",
    environment: ENVIRONMENT,
    start_date: serviceStart.utc().toString(),
    current_date: dayjs.utc().toString(),
    redis: redis.connected ? "Connected" : "Disconnected",
    database: databaseStatus,
  });
  next();
});

router.use("/adjustment", adjustmentRouter);
router.use("/audit-log", auditLogRouter);
router.use("/authen", authenRouter);
router.use("/inpartner", inpartnerRouter);
router.use("/inbranch", inbranchRouter);
router.use("/inagent", inagentRouter);
router.use("/inmerchant", inmerchantRouter);
router.use("/inportal", inportalRouter);
router.use("/inuser", inuserRouter);
router.use("/partner", partnerRouter);
router.use("/report", reportRouter);
router.use("/transaction", transactionRouter);

module.exports = router;
