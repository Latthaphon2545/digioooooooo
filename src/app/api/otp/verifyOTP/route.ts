import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "../../products/checkStock/route";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const { phone, email, otp, refNum } = await req.json();

    const otpRecords = await db.otp.findMany({
      where: {
        used: false,
      },
    });

    for (const record of otpRecords) {
      let isMatchVia = false;

      if (email && record.email) {
        isMatchVia = await bcrypt.compare(email.toString(), record.email);
      }

      if (phone && record.phoneNumber) {
        isMatchVia = await bcrypt.compare(phone.toString(), record.phoneNumber);
      }

      if (!isMatchVia) {
        continue;
      }

      const isMatchRefNum = await bcrypt.compare(
        refNum.toString(),
        record.referenceNumber
      );
      const timeOut30Second =
        new Date().getTime() - new Date(record.createdAt).getTime() <= 30000;

      if (isMatchVia && isMatchRefNum && timeOut30Second) {
        const isMatchOtp = await bcrypt.compare(otp.toString(), record.otp);

        if (isMatchOtp) {
          return new NextResponse(
            JSON.stringify({
              isMatchOtp,
              timeOut30Second,
              message: "OTP verified successfully.",
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        } else {
          return new NextResponse(
            JSON.stringify({
              isMatchOtp,
              timeOut30Second,
              message: `OTP verification failed. ${
                isMatchOtp ? "" : "OTP does not match."
              } ${timeOut30Second ? "" : "OTP has expired."}`,
            }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      }
    }

    return new NextResponse(
      JSON.stringify({
        message: "Phone number or email not found.",
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
    return createResponse("Internal server error", 500);
  }
};
