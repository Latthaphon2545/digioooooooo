import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { name, address, contact } = body ?? {};

    const updatedMerchant = await db.merchant.update({
      where: { id: id },
      data: { name, address, contact },
    });

    return NextResponse.json(updatedMerchant, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
