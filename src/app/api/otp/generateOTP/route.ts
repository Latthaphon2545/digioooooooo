import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "../../products/checkStock/route";
import { db } from "@/lib/db";
import crypto from "crypto";
const bcrypt = require("bcrypt");

export const POST = async (req: NextRequest) => {
  try {
    const { phone } = await req.json();

    const otpDb = await db.phoneNumberOtp.findMany({});

    // Iterate through the records to find a match
    for (const record of otpDb) {
      const isMatch = await bcrypt.compare(
        phone.toString(),
        record.phoneNumber
      );
      if (isMatch) {
        console.log("test");
        await db.phoneNumberOtp.delete({
          where: {
            id: record.id,
          },
        });
      }
    }

    // const otp = crypto.randomInt(100000, 999999);
    const otp = 111111;

    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    const hashedPhoneNumber = await bcrypt.hash(phone.toString(), 10);

    console.log(otp, hashedPhoneNumber);

    const OTP = await db.phoneNumberOtp.create({
      data: {
        otp: hashedOtp,
        phoneNumber: hashedPhoneNumber,
        createdAt: new Date(),
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: OTP,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
    return createResponse("Internal server error", 500);
  }
};
