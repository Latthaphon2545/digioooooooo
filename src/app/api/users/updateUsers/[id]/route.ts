import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { name, role, status, contact } = body ?? {};

    const updatedUser = await db.user.update({
      where: { id: id },
      data: { name, role, status, contact },
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
