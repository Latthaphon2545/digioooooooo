"use server";

import { uploadImage } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { StatusProduct } from "@/lib/types";
import axios from "axios";

export async function createModel(formData: FormData) {
  const INFORMATION_FIELD = [
    "operating_system",
    "processor",
    "display",
    "connectivity",
    "battery",
    "cameras",
    "payment_features",
  ];
  let image;
  const imageFile = formData.get("image");
  try {
    image = await uploadImage(imageFile as File);
  } catch (error) {
    console.error(error);
  }
  const model = {
    series: formData.get("series") as string,
    information: INFORMATION_FIELD.reduce(
      (infoObj: { [key: string]: string }, field) => {
        infoObj[field] = formData.get(field) as string;
        return infoObj;
      },
      {}
    ),
    status: Object.values(StatusProduct).reduce(
      (statusObj: Record<StatusProduct, number>, status: StatusProduct) => {
        statusObj[status] = 0;
        return statusObj;
      },
      {
        [StatusProduct.INSTOCK]: 0,
        [StatusProduct.LOST]: 0,
        [StatusProduct.DAMAGED]: 0,
        [StatusProduct.REPARING]: 0,
        [StatusProduct.WAITREPAIR]: 0,
        [StatusProduct.INSTALLED]: 0,
        [StatusProduct.INSTALLING]: 0,
      }
    ),
  };
  console.log("model", model);
  console.log("image", image);

  //   const res = await db.model.create({
  //     data: model,
  //   });
  //   return res;
}
