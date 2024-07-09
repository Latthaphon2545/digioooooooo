import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest) => {
  try {
    const bank = await db.bank.findMany({});

    return NextResponse.json({ bank }, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
};
