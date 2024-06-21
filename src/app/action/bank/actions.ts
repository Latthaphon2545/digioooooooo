"use server";

import { uploadImage } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBank(formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const imageFile = formData.get("image");

  console.log("name", name);
  console.log("imageFile", imageFile);

  let image;
  try {
    image = await uploadImage(imageFile as File);
  } catch (error) {
    console.error(error);
  }

  if (!name) {
    throw new Error("Name is required");
  }

  if (!image) {
    throw new Error("Image is required");
  }

  const bank = {
    name: name as string,
    image,
  };

  const res = await db.bank.create({
    data: bank,
  });
  console.log("response", res);

  revalidatePath("/banks");
  redirect("/banks");
}
