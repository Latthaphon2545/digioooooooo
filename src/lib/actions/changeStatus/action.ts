"use server";

import { uploadImage } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { encode, stringToHex } from "@/lib/generateRandomHref";
import { StatusProduct } from "@/lib/types";
import { redirect } from "next/navigation";

export async function changeStatus(sn: string, formData: FormData) {
  const description = formData.get("description") as string;
  const status = String(formData.get("status"))
    .toUpperCase()
    .replace(/ +/g, "") as StatusProduct;
  const imageFiles = formData.getAll("images");
  // console.log("description", description);
  // console.log("status", status);
  // console.log("imageFiles", imageFiles);
  // console.log("productId", productId);

  const images = [];
  for (const image of imageFiles) {
    try {
      images.push(await uploadImage(image as File));
    } catch (error) {
      console.error(error);
    }
  }

  const product = await db.product.findUnique({
    where: {
      serialNumber: sn,
    },
  });

  if (!product) {
    console.error("Product not found");
    return;
  }

  try {
    const res = await db.history.create({
      data: {
        user: {
          connect: {
            id: "66554e8534b8e2bb8f5f42d1",
          },
        },
        product: {
          connect: {
            id: product.id,
          },
        },
        description: description,
        category: status as StatusProduct,
        imageProve: images,
      },
    });
    console.log("History created");
    console.log(res);

    const updatedProduct = await db.product.update({
      where: {
        serialNumber: sn,
      },
      data: {
        status: status,
      },
    });
    console.log("Product updated");
    console.log(updatedProduct);
  } catch (err) {
    console.error("Error while creating history");
    console.log(err);
  }
  redirect(
    `/products/history/${stringToHex(sn)}?${encode(
      `filter=&search=&skip=0&take=8`
    )}`
  );
}
