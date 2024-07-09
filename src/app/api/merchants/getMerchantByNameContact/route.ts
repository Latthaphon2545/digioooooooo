import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    let merchant;

    if (!name) return NextResponse.json({ merchant: [] }, { status: 200 });

    merchant = await db.merchant.findMany({
      select: {
        name: true,
        contact: true,
        id: true,
      },
    });

    merchant = merchant.filter((m) =>
      m.name.toLowerCase().includes(name.toLowerCase())
    );

    return NextResponse.json({ merchant }, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
};
