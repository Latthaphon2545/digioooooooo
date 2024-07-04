import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchFilter = searchParams.get("filter") || "";
    const searchSearch = searchParams.get("search") || "";
    const skip = searchParams.get("skip") || 0;
    const take = searchParams.get("take") || 0;
    const skipInt = skip ? parseInt(skip) : undefined;
    const takeInt = take ? parseInt(take) : undefined;

    let filters = searchFilter
      .split(",")
      .map((f) => f.trim().toLocaleUpperCase())
      .filter(Boolean);

    // CALL CENTER -> CALLCENTER for filtering
    filters = filters.map((filter) =>
      filter === "CALL CENTER" ? "CALLCENTER" : filter
    );

    const statusFilters = ["ACTIVE", "INACTIVE", "RESTRICTED", "PENDING"];
    const roleFilters = ["ADMIN", "OPERATOR", "CALLCENTER"];

    const statusFilterArray = filters.filter((filter) =>
      statusFilters.includes(filter.toUpperCase())
    );
    const roleFilterArray = filters.filter((filter) =>
      roleFilters.includes(filter.toUpperCase())
    );

    if (statusFilterArray.length === 0) {
      statusFilterArray.push("ACTIVE", "INACTIVE", "RESTRICTED", "PENDING");
    }

    if (roleFilterArray.length === 0) {
      roleFilterArray.push("ADMIN", "OPERATOR", "CALLCENTER");
    }

    let whereClause: any = {
      status: {
        in: statusFilterArray,
      },
    };

    if (roleFilterArray.length > 0) {
      whereClause.role = {
        in: roleFilterArray,
      };
    }

    if (searchSearch) {
      whereClause.OR = [
        {
          name: {
            contains: searchSearch,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: searchSearch,
            mode: "insensitive",
          },
        },
      ];
    }

    const users = await db.user.findMany({
      skip: skipInt,
      take: takeInt,
      where: whereClause,
    });

    const totalUsers = await db.user.count({
      where: whereClause,
    });

    return NextResponse.json(
      {
        users: users,
        length: totalUsers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[GET TODO]", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
