// app/api/todo/route.ts
const { PrismaClient } = require("@prisma/client");
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const user = await prisma.user.findMany({});
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("[GET TODO]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
