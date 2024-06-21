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

    if (!merchant)
      return NextResponse.json(
        { message: "Merchant not found" },
        { status: 404 }
      );

    return NextResponse.json({ merchant }, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
};
