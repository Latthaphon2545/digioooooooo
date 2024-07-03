import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "../../products/checkStock/route";
import { db } from "@/lib/db";
import { PlaidVerifyIdentityEmail } from "@/components/email/emailOtp";
import { Resend } from "resend";
import crypto from "crypto";
import bcrypt from "bcrypt";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: NextRequest) => {
  try {
    const { phoneNumber, email } = await req.json();

    const otp = crypto.randomInt(100000, 999999);

    // random 6 characters in english
    const refNum = crypto.randomBytes(3).toString("hex");
    const hashedRefNum = await bcrypt.hash(refNum, 10);

    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    if (phoneNumber) {
      const hashedPhoneNumber = await bcrypt.hash(phoneNumber.toString(), 10);
      await db.otp.create({
        data: {
          otp: hashedOtp,
          phoneNumber: hashedPhoneNumber,
          referenceNumber: hashedRefNum,
          createdAt: new Date(),
        },
      });
    }

    if (email) {
      const hashedEmail = await bcrypt.hash(email.toString(), 10);
      await db.otp.create({
        data: {
          otp: hashedOtp,
          email: hashedEmail,
          referenceNumber: hashedRefNum,
          createdAt: new Date(),
        },
      });
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Verify your identity`,
      react: PlaidVerifyIdentityEmail({
        validationCode: otp.toString(),
        referenceNumber: refNum,
      }),
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
