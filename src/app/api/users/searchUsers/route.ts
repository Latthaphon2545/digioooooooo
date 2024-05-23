// app/api/todo/route.ts

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchFilter = searchParams.get("filter") || "";
    const searchSearch = searchParams.get("search") || "";
    const filters = searchFilter
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean); // Remove empty strings

    const statusFilters = ["Active", "Inactive", "Restricted", "Pending"];
    const roleFilters = ["Admin", "Operator", "Call Center"];

    const statusFilterArray = filters.filter((filter) =>
      statusFilters.includes(filter)
    );
    const roleFilterArray = filters.filter((filter) =>
      roleFilters.includes(filter)
    );

    // Default to all statuses if no specific status filter is provided
    if (statusFilterArray.length === 0) {
      statusFilterArray.push("Active", "Inactive", "Restricted", "Pending");
    }

    if (roleFilterArray.length === 0) {
      roleFilterArray.push("Admin", "Operator", "Call Center");
    }

    // Construct the `where` clause
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

    // Add search conditions if a search term is provided
    if (searchSearch) {
      whereClause.OR = [
        {
          name: {
            contains: searchSearch,
            mode: "insensitive", // Makes the search case-insensitive
          },
        },
        {
          email: {
            contains: searchSearch,
            mode: "insensitive", // Makes the search case-insensitive
          },
        },
      ];
    }

    const users = await prisma.user.findMany({
      where: whereClause,
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log("[GET TODO]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
