import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sn = searchParams.get("sn");

    if (!sn) {
      return NextResponse.json(
        { error: "Missing serial number parameter" },
        { status: 400 }
      );
    }

    const product = await db.product.findFirst({
      where: { serialNumber: sn },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[GET TODO]", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
