import { User } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { setPasswordSend } from "@/lib/actions/email/setPassword";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    // Process users in parallel
    const processedUsers = [];
    for (const element of data) {
      const password = crypto.randomBytes(10).toString("hex");
      const passwordHash = await bcrypt.hash(password, 10);
      element.hashedPassword = passwordHash;

      // Send email and handle errors
      try {
        const info = await setPasswordSend({ element, password });
        // console.log("Email sent:", info);
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }

      processedUsers.push(element);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

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
