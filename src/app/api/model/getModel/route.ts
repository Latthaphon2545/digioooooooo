import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const models = await db.model.findMany({
      include: {
        product: true,
      },
    });

    const statusMap = new Map<string, { [key: string]: number }>();

    models.forEach((model) => {
      // Initialize the status counts for each model in the Map
      statusMap.set(model.id, {
        INSTOCK: 0,
        LOST: 0,
        DAMAGED: 0,
        REPAIRING: 0,
        WAITREPAIR: 0,
        INSTALLED: 0,
        INSTALLING: 0,
      });
    });

    models.forEach((model) => {
      model.product.forEach((product) => {
        const modelStatus = statusMap.get(model.id);
        if (modelStatus && product.status in modelStatus) {
          modelStatus[product.status]++;
        }
      });
    });

    const updatedModels = models.map((model) => {
      const modelStatus = statusMap.get(model.id) || {
        INSTOCK: 0,
        LOST: 0,
        DAMAGED: 0,
        REPAIRING: 0,
        WAITREPAIR: 0,
        INSTALLED: 0,
        INSTALLING: 0,
      };
      return {
        ...model,
        status: modelStatus,
      };
    });

    return NextResponse.json(
      {
        models: updatedModels,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[GET TODO]", error);
    return NextResponse.json(error, { status: 500 });
  }
}
