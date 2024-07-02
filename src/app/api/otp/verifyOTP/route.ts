import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "../../products/checkStock/route";
import { db } from "@/lib/db";
const bcrypt = require("bcrypt");

export const POST = async (req: NextRequest) => {
  try {
    const { phone, otp, refNum } = await req.json();

    const otpDb = await db.phoneNumberOtp.findMany({});

    for (const record of otpDb) {
      const isMatchPhone = await bcrypt.compare(
        phone.toString(),
        record.phoneNumber
      );

      const isMatchRefNum = await bcrypt.compare(
        refNum.toString(),
        record.ReferenceNumber
      );

      const timeOut30Second =
        new Date().getTime() - new Date(record.createdAt).getTime() <= 30000;

      // Check if the phone number matches
      if (isMatchPhone && isMatchRefNum && timeOut30Second) {
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
        message: "Phone number not found.",
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
