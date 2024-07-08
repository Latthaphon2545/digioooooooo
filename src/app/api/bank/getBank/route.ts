import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

enum StatusProduct {
  INSTOCK = "INSTOCK",
  LOST = "LOST",
  DAMAGED = "DAMAGED",
  REPARING = "REPARING",
  WAITREPAIR = "WAITREPAIR",
  INSTALLED = "INSTALLED",
  INSTALLING = "INSTALLING",
}

export const GET = async (_req: NextRequest) => {
  try {
    // Fetch all banks, products with necessary fields, and models
    const [banks, products, models] = await Promise.all([
      db.bank.findMany({}),
      db.product.findMany({
        select: {
          id: true,
          bankId: true,
          status: true,
          model: {
            select: {
              series: true,
            },
          },
        },
      }),
      db.model.findMany({
        select: {
          series: true,
          image: true,
        },
      }),
    ]);

    // Initialize productStatus object
    const productStatus: Record<
      string,
      Record<
        string,
        {
          image?: string | null | undefined;
          status: Record<string, number>;
        }
      >
    > = {};

    // Populate productStatus based on products data
    products.forEach((product) => {
      const bankId = product.bankId ?? "UNKNOWN_BANK"; // Use a default value for null bankId
      const series = product.model?.series ?? "UNKNOWN_SERIES";
      const status = product.status;

      if (!productStatus[bankId]) {
        productStatus[bankId] = {};
      }
      if (!productStatus[bankId][series]) {
        productStatus[bankId][series] = {
          status: {
            [status]: 1,
          },
        };
        // Initialize other status types
        Object.values(StatusProduct)
          .filter((key) => isNaN(Number(key)))
          .forEach((key) => {
            if (key !== status) {
              productStatus[bankId][series].status[key] = 0;
            }
          });
      } else {
        productStatus[bankId][series].status[status] += 1;
      }
    });

    // Ensure all models and banks are covered
    banks.forEach((bank) => {
      const bankId = bank.id;
      if (!productStatus[bankId]) {
        productStatus[bankId] = {};
      }
      models.forEach((model) => {
        const series = model.series;
        if (!productStatus[bankId][series]) {
          productStatus[bankId][series] = {
            status: Object.fromEntries(
              Object.values(StatusProduct)
                .filter((key) => isNaN(Number(key)))
                .map((key) => [key, 0])
            ),
          };
        }
      });
    });

    // sort status by StatusProduct enum -> INSTOCK, LOST, DAMAGED, REPARING, WAITREPAIR, INSTALLED, INSTALLING
    Object.keys(productStatus).forEach((bankId) => {
      Object.keys(productStatus[bankId]).forEach((series) => {
        const status = productStatus[bankId][series].status;
        const sortedStatus = {
          INSTOCK: status["INSTOCK"] ?? 0,
          LOST: status["LOST"] ?? 0,
          DAMAGED: status["DAMAGED"] ?? 0,
          REPARING: status["REPARING"] ?? 0,
          WAITREPAIR: status["WAITREPAIR"] ?? 0,
          INSTALLED: status["INSTALLED"] ?? 0,
          INSTALLING: status["INSTALLING"] ?? 0,
        };
        productStatus[bankId][series].status = sortedStatus;
        productStatus[bankId][series].image = models.find(
          (model) => model.series === series
        )?.image;
      });
    });

    // Sort models by series -> A-Z
    banks.forEach((bank) => {
      productStatus[bank.id] = Object.fromEntries(
        Object.entries(productStatus[bank.id]).sort()
      );
    });

    // Format the response
    const formattedResponse = banks.map((bank) => ({
      name: bank.name,
      image: bank.image,
      product: productStatus[bank.id],
    }));

    return NextResponse.json(
      { bankStatus: formattedResponse },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
};
