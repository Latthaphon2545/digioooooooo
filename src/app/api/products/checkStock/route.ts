import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Helper function to create responses
const createResponse = (message: string, status: number) => {
  return new NextResponse(JSON.stringify({ message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST = async (req: NextRequest) => {
  try {
    const { sn, user } = await req.json();

    // Check if the product and user both exist
    const [product, userExist] = await Promise.all([
      db.product.findFirst({ where: { serialNumber: sn } }),
      db.user.findFirst({ where: { id: user } }),
    ]);

    // Return 404 if either product or user does not exist
    if (!product || !userExist) {
      const missingEntity = !product ? "Product" : "User";
      return createResponse(`${missingEntity} not found`, 404);
    }

    // Calculate the date one month ago from now
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Check if there has been a stock check for this product within the past month
    const recentCheck = await db.history.findFirst({
      where: {
        product: {
          id: product.id,
        },
        category: "INSTOCK",
        description: "Check stock",
        createdAt: {
          gte: oneMonthAgo,
        },
      },
    });

    if (recentCheck) {
      return createResponse(
        "SN has been checked for stock within the past month",
        400
      );
    }

    // Create a new stock check history
    const checkStock = await db.history.create({
      data: {
        product: {
          connect: {
            id: product.id,
          },
        },
        description: "Check stock",
        user: {
          connect: {
            id: user,
          },
        },
        category: "INSTOCK",
      },
    });

    // Return success response
    return new NextResponse(
      JSON.stringify({
        message: `Successfully checked stock for ${sn}`,
        data: checkStock,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error(error);
    return createResponse("Internal server error", 500);
  }
};
