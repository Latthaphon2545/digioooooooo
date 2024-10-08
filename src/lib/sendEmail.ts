import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: "otterio.digipay.dev",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const formAccount = `"no-reply@digipay_internship" <${process.env.NODEMAILER_FROM}>`;

// export const transporter = createTransport({
//   host: "localhost",
//   port: 1025,
//   auth: {
//     user: "project.1",
//     pass: "secret.1",
//   },
// });
