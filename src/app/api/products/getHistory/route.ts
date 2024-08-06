import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sn = searchParams.get("sn") || "";
    const skip = searchParams.get("skip") || "";
    const take = searchParams.get("take") || "";
    const skipInt = parseInt(skip ?? 0);
    const takeInt = take ? parseInt(take) : 10;

    const productsHistory = await db.history.findMany({
      where: {
        productId: sn,
      },
      skip: skipInt,
      take: takeInt,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    const product = await db.product.findUnique({
      where: {
        serialNumber: sn,
      },
      include: {
        merchant: true,
        model: true,
      },
    });

    const lengthHistory = await db.history.count({
      where: {
        productId: {
          contains: sn,
        },
      },
    });

    return NextResponse.json(
      { productsHistory, product, lengthHistory },
      { status: 200 }
    );
  } catch (error) {
    console.log("[GET TODO]", error);
    return NextResponse.json(error, { status: 500 });
  }
}
