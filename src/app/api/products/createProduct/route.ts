import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    console.log(data);
    data.forEach((element: { sn: string; model: string }) =>
      console.log(typeof element.sn)
    );
    return new NextResponse(JSON.stringify(data), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // const products = [];

    // for (const item of data) {
    //   const product = await db.product.create({
    //     data: {
    //       serialNumber: item.sn,
    //       model: {
    //         connect: {
    //           id: item.model,
    //         },
    //       },
    //       history: {
    //         create: {
    //           user: {
    //             connect: {
    //               id: "66554e8534b8e2bb8f5f42d1", //data.userId
    //             },
    //           },
    //           description: "Product added",
    //           category: "CHECKSTOCK",
    //         },
    //       },
    //     },
    //   });

    //   products.push(product);
    // }

    // return new NextResponse(JSON.stringify(products), {
    //   status: 201,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
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
