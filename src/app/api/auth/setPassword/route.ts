import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, oldPassword, newPassword, method } = body ?? {};

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      user.hashedPassword
    );

    console.log(isPasswordMatch);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Old password does not match" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (method === "setPassword") {
      await db.user.update({
        where: { email },
        data: { hashedPassword, status: "ACTIVE" },
      });
    } else if (method === "forgotPassword") {
      await db.user.update({
        where: { email },
        data: { hashedPassword },
      });
    }

    return NextResponse.json({ message: "Password updated" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
