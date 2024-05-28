import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    // console.log("backend", data);
    // return new NextResponse(JSON.stringify(data));
    const merchant = await db.merchant.create({
      data: {
        name: data.name,
        address: data.address,
        contact: data.contact,
        product: {
          connect: {
            id: data.productId,
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(merchant), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
};
