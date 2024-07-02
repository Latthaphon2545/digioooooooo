import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcrypt");

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, oldPassword, newPassword } = body ?? {};

    const user = await db.user.findUnique({
      where: { email },
    });

    console.log(user);

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

    const passwordSet = await db.user.update({
      where: { email },
      data: { hashedPassword, status: "ACTIVE" },
    });

    console.log(passwordSet);

    return NextResponse.json({ message: "Password updated" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
