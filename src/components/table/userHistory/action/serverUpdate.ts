"use server";
import { uploadImage } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { StatusProduct } from "@/lib/types";
import { revalidatePath } from "next/cache";

type UpdateData = {
  description?: string;
  category?: StatusProduct;
  imageProve?: string[];
};

export const updateUserHistoryOnServer = async (
  id: string,
  formData: FormData
) => {
  console.log("test");

  try {
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const imageFiles = formData.getAll("images");

    const images = [];
    if (imageFiles.length > 0) {
      for (const image of imageFiles) {
        try {
          images.push(await uploadImage(image as File));
        } catch (error) {
          console.error(error);
        }
      }
    }

    const updateData: UpdateData = {
      description,
      category: category as StatusProduct,
    };

    if (images.length > 0) {
      const currentHistory = await db.history.findUnique({ where: { id: id } });

      if (!currentHistory) {
        console.error("History not found");
        return;
      }

      const existingImages = currentHistory?.imageProve || [];
      const combinedImages = [...existingImages, ...images];
      updateData.imageProve = combinedImages;
    }

    const updateUserHistory = await db.history.update({
      where: { id: id },
      data: updateData,
    });

    console.log("User history updated", updateUserHistory);
    revalidatePath("/", "layout");
  } catch (error) {
    console.error(error);
  }
};
