import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcrypt");

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { name, contact } = body ?? {};

    const updatedUser = await db.user.update({
      where: { id: id },
      data: { name, contact },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
