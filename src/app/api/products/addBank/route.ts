import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, bankId } = body ?? {};

    if (!productId || !bankId) {
      return NextResponse.json(
        { error: "Product ID and Merchant ID are required" },
        { status: 400 }
      );
    }

    // Check if product exists
    const productExists = await db.product.findFirst({
      where: { id: productId },
    });

    if (!productExists) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if bank exists
    const bankExists = await db.bank.findFirst({
      where: { id: bankId },
    });

    // Update the merchant to connect it with the product
    const updatedProduct = await db.product.update({
      where: {
        id: productId,
      },
      data: {
        bank: {
          connect: { id: bankId },
        },
      },
    });

    return NextResponse.json({
      message: "Bank updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error("[PATCH MERCHANT]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
