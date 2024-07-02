import { User } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { VercelInviteUserEmail } from "@/components/email/userInvite";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { db } from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);

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
      const { error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "games2545.lattapon@gmail.com",
        subject: `Create your account`,
        react: VercelInviteUserEmail({
          invitedByEmail: element.email,
          invitedByName: element.name,
          invitedByPassword: password,
        }),
      });

      if (error) {
        console.error(`Error sending email to ${element.email}:`, error);
        throw new Error(`Failed to send email to ${element.email}`);
      }

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
