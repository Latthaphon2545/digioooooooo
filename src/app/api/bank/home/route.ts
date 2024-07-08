import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

enum StatusProduct {
  INSTOCK,
  LOST,
  DAMAGED,
  REPARING,
  WAITREPAIR,
  INSTALLED,
  INSTALLING,
}

export const GET = async (_req: NextRequest) => {
  try {
    const bank = await db.bank.findMany({});

    const products = await db.product.findMany({
      select: {
        status: true,
        bankId: true,
      },
    });

    const bankStatus = bank.map((bank) => {
      const status = products.reduce(
        (statusObj: Record<string, number>, product) => {
          if (product.bankId === bank.id) {
            if (product.status in StatusProduct) {
              statusObj[product.status] = (statusObj[product.status] || 0) + 1;
            }
          }
          return statusObj;
        },
        {}
      );

      // Add missing status
      for (const key of Object.keys(StatusProduct).filter((key) =>
        isNaN(Number(key))
      )) {
        if (!(key in status)) {
          status[key] = 0;
        }
      }

      return {
        name: bank.name,
        status,
        image: bank.image,
      };
    });

    return NextResponse.json({ bankStatus }, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
};
