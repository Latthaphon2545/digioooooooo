// app/api/todo/route.ts

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const model = await db.model.findMany({});

    const seriesModel = model.map((model) => model.series);

    return NextResponse.json(
      {
        seriesModel,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[GET TODO]", error);
    return NextResponse.json(error, { status: 500 });
  }
}
