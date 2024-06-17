import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    const products = [];
    const errors = [];

    for (const item of data) {
      const existingProduct = await db.product.findUnique({
        where: {
          serialNumber: item.sn,
        },
      });

      if (existingProduct) {
        errors.push({
          sn: item.sn,
          message: "Product with these serial numbers already exists",
        });
        continue;
      }

      const product = await db.product.create({
        data: {
          serialNumber: item.sn,
          model: {
            connect: {
              id: item.model,
            },
          },
          history: {
            create: {
              user: {
                connect: {
                  id: "66554e8534b8e2bb8f5f42d1", //data.userId
                },
              },
              description: "Product added",
              category: "INSTOCK",
            },
          },
        },
      });

      products.push(product);
    }

    if (errors.length > 0) {
      return new NextResponse(JSON.stringify({ products, errors }), {
        status: 409,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new NextResponse(JSON.stringify({ products }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        message: "An error occurred while creating the products",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
