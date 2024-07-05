import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "../../products/checkStock/route";
import { db } from "@/lib/db";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { otpSend } from "@/lib/actions/email/otp";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    const otp = crypto.randomInt(100000, 999999);

    // random 6 characters in english
    const refNum = crypto.randomBytes(3).toString("hex");
    const hashedRefNum = await bcrypt.hash(refNum, 10);

    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    await db.otp.create({
      data: {
        otp: hashedOtp,
        referenceNumber: hashedRefNum,
        createdAt: new Date(),
      },
    });

    // Send email
    const info = await otpSend({
      otp,
      refNum,
      email,
    });

    return new NextResponse(
      JSON.stringify({
        message: refNum,
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
