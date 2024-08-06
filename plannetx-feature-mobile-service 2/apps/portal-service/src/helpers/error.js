class HttpError extends Error {
  constructor(error) {
    super();
    this.message = "HTTP Error";
    this.status = error.status;
    this.resCode = error.resCode;
    this.resDesc = error.resDesc;
    console.log(this.payload);
  }
}

class ServiceError extends Error {
  constructor(error) {
    super();
    this.message = "Service Error";
    this.status = error.status;
    this.resCode = error.resCode;
    this.resDesc = error.resDesc;
    // this.payload = payload;
    console.log(this.payload);
  }

  toJSON() {
    return {
      res_code: this.resCode,
      res_desc: this.resDesc,
      ...this.payload,
    };
  }
}

module.exports = {
  HttpError,
  ServiceError,
};
