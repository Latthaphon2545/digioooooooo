import { User } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { passwordSetEmail } from "@/components/email/password";
import { formAccount, transporter } from "@/lib/sendEmail";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    // Process users in parallel
    const userPromises = data.map(async (element: User) => {
      const password = crypto.randomBytes(10).toString("hex");
      const passwordHash = await bcrypt.hash(password, 10);
      element.hashedPassword = passwordHash;

      console.log(password, passwordHash);

      // Send email
      const info = await transporter.sendMail({
        from: formAccount,
        to: "Latthaphon.p@kkumail.com",
        subject: `Welcome to Digio Stock ${element.name}`,
        html: passwordSetEmail({
          invitedByEmail: element.email,
          invitedByName: element.name,
          invitedByPassword: password,
          type: "setPassword",
        }),
      });

      console.log(info);

      return element;
    });

    // Await all user processing
    const processedUsers = await Promise.all(userPromises);

    // Insert users into the database
    const users = await db.user.createMany({
      data: processedUsers,
    });

    return new NextResponse(JSON.stringify(users), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
