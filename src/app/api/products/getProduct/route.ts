import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchFilter = searchParams.get("filter") || "";
    const searchSearch = searchParams.get("search") || "";
    const skip = searchParams.get("skip") || "";
    const take = searchParams.get("take") || "";
    const skipInt = skip ? parseInt(skip) : undefined;
    const takeInt = take ? parseInt(take) : undefined;

    const filters = searchFilter
      .split(",")
      .map((f) => f.toUpperCase().replace(/\s/g, ""))
      .filter(Boolean);

    if (filters.includes("WAITINGFORREPAIR")) {
      filters[filters.indexOf("WAITINGFORREPAIR")] = "WAITREPAIR";
    }

    const statusFilters = [
      "INSTOCK",
      "LOST",
      "DAMAGED",
      "REPAIRING",
      "WAITREPAIR",
      "INSTALLED",
      "INSTALLING",
    ];

    const models = await db.model.findMany({});
    const seriesFilters = models.map((s) => {
      return {
        name: s.series.toUpperCase(),
        id: s.id,
      };
    });

    const seriesNames = seriesFilters.map((filter) => filter.name);

    const statusFilterArray = filters.filter((filter) =>
      statusFilters.includes(filter.toUpperCase())
    );

    const seriesFilterArray = filters.filter((filter) =>
      seriesNames.includes(filter.toUpperCase())
    );

    if (statusFilterArray.length === 0) {
      statusFilterArray.push(
        "INSTOCK",
        "LOST",
        "DAMAGED",
        "REPARING",
        "WAITREPAIR",
        "INSTALLED",
        "INSTALLING"
      );
    }

    if (seriesFilterArray.length === 0) {
      seriesFilterArray.push(...seriesNames);
    }

    let whereClause: any = {
      status: {
        in: statusFilterArray,
      },
    };

    // if (seriesFilterArray.length > 0) {
    //   whereClause.modelId = {
    //     in: ["6653fb1a46d03de9c52ec2d6"],
    //   };
    // }

    if (searchSearch) {
      whereClause.OR = [
        {
          serialNumber: {
            contains: searchSearch,
            mode: "insensitive",
          },
        },
      ];
    }

    const products = await db.product.findMany({
      skip: skipInt,
      take: takeInt,
      where: whereClause,
      include: {
        model: true,
      },
    });

    const totalProducts = await db.product.count({
      where: whereClause,
    });

    return NextResponse.json(
      {
        products,
        totalProducts: totalProducts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[GET TODO]", error);
    return NextResponse.json(error, { status: 500 });
  }
}
