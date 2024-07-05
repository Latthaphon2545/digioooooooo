import { PlaidVerifyIdentityEmail } from "@/components/email/emailOtp";
import { formAccount, transporter } from "@/lib/sendEmail";

export const otpSend = async ({
  otp,
  refNum,
  email,
}: {
  otp: number;
  refNum: any;
  email: string;
}) => {
  const info = await transporter.sendMail({
    from: formAccount,
    to: "latthaphon.p@kkumail.com",
    subject: `Verify your identity : ${otp}`,
    html: PlaidVerifyIdentityEmail({
      validationCode: otp.toString(),
      referenceNumber: refNum,
    }),
    attachments: [
      {
        filename: "digio_logo.png",
        path: "public/image/digio_logo.png",
        cid: "digio_logo",
      },
    ],
  });

  return info;
};
