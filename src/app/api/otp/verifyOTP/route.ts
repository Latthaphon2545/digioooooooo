import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "../../products/checkStock/route";
import { db } from "@/lib/db";
const bcrypt = require("bcrypt");

export const POST = async (req: NextRequest) => {
  try {
    const { phone, otp } = await req.json();

    const otpDb = await db.phoneNumberOtp.findMany({});

    console.log(phone, otp);

    for (const record of otpDb) {
      const isMatchPhone = await bcrypt.compare(
        phone.toString(),
        record.phoneNumber
      );

      // Check if the phone number matches
      if (isMatchPhone) {
        // Check if the OTP matches
        const isMatchOtp = await bcrypt.compare(otp.toString(), record.otp);

        // Check if the OTP is within the valid time (30 seconds)
        const timeOut30Second =
          new Date().getTime() - new Date(record.createdAt).getTime() <= 30000;

        if (timeOut30Second && isMatchOtp) {
          // Delete the OTP record from the database
          const deleteOtp = await db.phoneNumberOtp.delete({
            where: {
              id: record.id,
            },
          });

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
              message: "OTP verified failed",
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
