import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const searchSearch = searchParams.get("search") || "";
    const skip = searchParams.get("skip") || "";
    const take = searchParams.get("take") || "";
    const skipInt = skip ? parseInt(skip) : undefined;
    const takeInt = take ? parseInt(take) : undefined;

    let whereClause: any = {};

    if (searchSearch) {
      whereClause = {
        name: {
          contains: searchSearch,
          mode: "insensitive",
        },
      };
    }

    const merchant = await db.merchant.findMany({
      skip: skipInt,
      take: takeInt,
      where: whereClause,
      include: {
        product: {
          include: {
            model: {
              select: {
                series: true,
              },
            },
          },
        },
      },
    });
    const totalMerchant = await db.merchant.count({
      where: whereClause,
    });

    return NextResponse.json(
      {
        merchant: merchant,
        totalMerchant: totalMerchant,
      },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
};
