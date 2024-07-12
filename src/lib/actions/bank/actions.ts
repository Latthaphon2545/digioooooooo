"use server";

import { uploadImage } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBank(prevData: any, formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const bankAbbreviation = formData.get("bankAbbreviation")?.toString().trim();
  const imageFile = formData.get("image");

  console.log("name", name);
  console.log("bankAbbreviation", bankAbbreviation);
  console.log("imageFile", imageFile);

  let image;
  try {
    image = await uploadImage(imageFile as File);
  } catch (error) {
    console.error(error);
  }

  let errors = [];

  if (!name) {
    errors.push("Please fill out the bank name field before submitting");
  }

  if (!bankAbbreviation) {
    errors.push(
      "Please fill out the bank abbreviation field before submitting"
    );
  }

  if (!image) {
    errors.push("Please upload an image before submitting");
  }

  if (errors.length > 0) {
    console.error(errors);
    return { errors };
  }

  const bank = {
    name: name as string,
    bankAbbreviations: bankAbbreviation as string,
    image: image as string,
  };

  const res = await db.bank.create({
    data: bank,
  });
  console.log("response", res);

  revalidatePath("/banks");
  redirect("/banks");
}
