import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);

    const skip = parseInt(searchParams.get("skip") || "");
    const take = parseInt(searchParams.get("take") || "");
    console.log("skip", skip);
    console.log("take", take);

    console.log("id", id);

    if (!id) {
      console.log("User with this id is not found");

      return NextResponse.json(
        { message: "User with this id is not found" },
        { status: 400 }
      );
    }
    const userHistory = await db.history.findMany({
      where: {
        userId: id,
      },
      // include: {
      //   product: {
      //     select: {
      //       id: true,
      //       serialNumber: true,
      //     },
      //   },
      // },
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalHistory = await db.history.count({
      where: {
        userId: id,
      },
    });

    console.log(userHistory, totalHistory);
    return NextResponse.json({ userHistory, totalHistory });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
