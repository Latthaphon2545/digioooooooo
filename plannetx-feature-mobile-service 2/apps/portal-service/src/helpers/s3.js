const S3 = require("aws-sdk/clients/s3");

const AWS_S3_REGION = process.env.AWS_S3_REGION;

const s3 = new S3({
  apiVersion: "2006-03-01",
  region: AWS_S3_REGION,
});

module.exports = s3;
