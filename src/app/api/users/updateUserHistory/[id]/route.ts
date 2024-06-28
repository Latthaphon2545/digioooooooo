import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,

  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { description, category, images } = body ?? {};
    console.log("id", id);
    console.log("description", description);
    console.log("category", category);
    console.log("images", images);

    return NextResponse.json({ message: "success" }, { status: 200 });

    // const updateUserHistory = await db.history.update({
    //   where: { id: id },
    //   data: { description, category },
    // });

    // return NextResponse.json(updateUserHistory, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
