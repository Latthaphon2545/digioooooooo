import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || "";

    const merchant = await db.merchant.findFirst({
      where: {
        id: id,
      },
    });

    return NextResponse.json(merchant);
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
};
