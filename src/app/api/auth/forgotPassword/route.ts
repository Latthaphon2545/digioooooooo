import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { formAccount, transporter } from "@/lib/sendEmail";
import { encode } from "@/lib/generateRandomHref";
import { passwordSetEmail } from "@/components/email/password";

export const POST = async (req: NextRequest) => {
  try {
    const { email, phoneNumber } = await req.json();

    if (email && email.length > 0) {
      if (!email.includes("@") || !email.includes(".")) {
        return new NextResponse(
          JSON.stringify({ error: "Invalid email address" }),
          {
            status: 500,
          }
        );
      }
    } else {
      if (phoneNumber.length !== 10) {
        return new NextResponse(
          JSON.stringify({ error: "Invalid phone number" }),
          {
            status: 500,
          }
        );
      }
    }

    // find user by email or phone number
    const user = await db.user.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          {
            contact: phoneNumber,
          },
        ],
      },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          error: "User not found. Please check your email or phone number.",
        }),
        {
          status: 404,
        }
      );
    }

    // // Change password
    const password = crypto.randomBytes(10).toString("hex");
    const passwordHash = await bcrypt.hash(password, 10);
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        hashedPassword: passwordHash,
      },
    });

    const info = await transporter.sendMail({
      from: formAccount,
      to: "Latthaphon.p@kkumail.com",
      subject: `Forgot Password - ${updatedUser.name}`,
      html: passwordSetEmail({
        invitedByEmail: updatedUser.email,
        invitedByName: updatedUser.name,
        invitedByPassword: password,
      }),
    });

    return new NextResponse(
      JSON.stringify({ message: "Password reset email sent" }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
};