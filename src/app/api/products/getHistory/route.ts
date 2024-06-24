import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sn = searchParams.get("sn") || "";
    const skip = searchParams.get("skip") || "";
    const take = searchParams.get("take") || "";
    const skipInt = skip ? parseInt(skip) : undefined;
    const takeInt = take ? parseInt(take) : undefined;

    const productsHistory = await db.history.findMany({
      where: {
        productId: {
          contains: sn,
        },
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
        product: {
          include: {
            model: {
              select: {
                series: true,
                image: true,
              },
            },
            merchant: true,
          },
        },
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
      { productsHistory, lengthHistory },
      { status: 200 }
    );
  } catch (error) {
    console.log("[GET TODO]", error);
    return NextResponse.json(error, { status: 500 });
  }
}
