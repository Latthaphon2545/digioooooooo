import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId } = body ?? {};

    if (!productId) {
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

    // Update the product to disconnect it from the merchant
    const updatedProduct = await db.product.update({
      where: {
        id: productId,
      },
      data: {
        merchantId: null,
      },
    });

    return NextResponse.json({
      message: "Merchant association removed successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error("[DELETE MERCHANT]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
