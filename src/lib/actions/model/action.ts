"use server";

import { uploadImage } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { StatusProduct } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createModel(prevState: any, formData: FormData) {
  //export async function createModel(formData: FormData) {
  const INFORMATION_FIELD = [
    "description",
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
  let errors = [];

  const series = formData.get("series")?.toString().trim() as string;

  if (!series) {
    errors.push("Please fill out the series field before submitting");
  }

  INFORMATION_FIELD.forEach((field) => {
    if (!formData.get(field)?.toString().trim()) {
      errors.push(`Please fill out the '${field}' field before submitting.`);
    }
  });

  if (errors.length > 0) {
    console.error(errors);
    return { errors };
  }

  const model = {
    series: series,
    information: INFORMATION_FIELD.reduce(
      (infoObj: { [key: string]: string }, field) => {
        infoObj[field] = formData.get(field) as string;
        return infoObj;
      },
      {}
    ),
    image: image,
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

  const res = await db.model.create({
    data: model,
  });

  revalidatePath("/products/models");
  redirect("/products/models");
}
