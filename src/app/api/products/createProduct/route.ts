import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    // console.log("backend", data);
    // return new NextResponse(JSON.stringify(data));
    const products = await db.product.create({
      data: {
        serialNumber: data.serialNumber,
        model: {
          connect: {
            id: data.modelId,
          },
        },
        history: {
          create: {
            user: {
              connect: {
                id: data.userId,
              },
            },
            description: "Product added",
            category: "CHECKSTOCK",
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(products), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
};
