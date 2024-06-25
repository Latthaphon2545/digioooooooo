import { db } from "@/lib/db";
import { User } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const users = await db.history.create({
      data: {
        user: {
          connect: {
            id: "66554e8534b8e2bb8f5f42d1",
          },
        },
        product: {
          connect: {
            id: "666172a14b698bf74be08614",
          },
        },
        description: data.description,
        category: data.status,
      },
    });
    return new NextResponse(JSON.stringify(users), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
};
