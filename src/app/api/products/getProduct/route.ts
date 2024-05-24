// app/api/todo/route.ts

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const users = await db.user.findMany({});

    return NextResponse.json(
      {
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[GET TODO]", error);
    return NextResponse.json(error, { status: 500 });
  }
}
