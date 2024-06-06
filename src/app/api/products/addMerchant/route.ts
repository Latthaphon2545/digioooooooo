import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, merchantId } = body ?? {};

    if (!productId || !merchantId) {
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

    // Check if merchant exists
    const merchantExists = await db.merchant.findFirst({
      where: { id: merchantId },
      include: { product: true },
    });

    if (!merchantExists) {
      return NextResponse.json(
        { error: "Merchant not found" },
        { status: 404 }
      );
    }

    // Update the merchant to connect it with the product
    const updatedMerchant = await db.merchant.update({
      where: {
        id: merchantId,
      },
      data: {
        product: {
          connect: { id: productId },
        },
      },
      include: { product: true },
    });

    return NextResponse.json({
      message: "Merchant updated successfully",
      updatedMerchant,
    });
  } catch (error) {
    console.error("[PATCH MERCHANT]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
