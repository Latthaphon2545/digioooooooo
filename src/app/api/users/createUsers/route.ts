import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    // console.log("backend", data);
    // return new NextResponse(JSON.stringify(data));
    const users = await db.user.createMany({
      data: data,
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
