import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcrypt");

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, oldPassword, newPassword } = body ?? {};

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      user.hashedPassword
    );

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Old password does not match" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.update({
      where: { id: userId },
      data: { hashedPassword },
    });

    return NextResponse.json({ message: "Password updated" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
