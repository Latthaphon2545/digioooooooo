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
  try {
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const imageFiles = formData.getAll("images");
    const imageToDelete = formData.getAll("imagesToDelete");
    console.log("image", imageFiles);
    console.log("image to delete", imageToDelete);

    console.log("Description", description);
    console.log("Category", category);

    // const images = [];
    // if (imageFiles.length > 0) {
    //   for (const image of imageFiles) {
    //     try {
    //       images.push(await uploadImage(image as File));
    //       console.log("Image uploaded");
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    // }

    // const updateData: UpdateData = {
    //   description,
    //   category: category as StatusProduct,
    // };

    // if (images.length > 0 || imageToDelete.length > 0) {
    //   const currentHistory = await db.history.findUnique({ where: { id: id } });

    //   if (!currentHistory) {
    //     console.error("History not found");
    //     return;
    //   }

    //   const existingImages = currentHistory?.imageProve || [];

    //   let updatedImages = [...existingImages, ...images];

    //   if (imageToDelete.length > 0) {
    //     console.log("Image to delete", imageToDelete);

    //     updatedImages = updatedImages.filter(
    //       (image) => !imageToDelete.includes(image)
    //     );
    //   }
    //   updateData.imageProve = updatedImages;
    // }

    // console.log("Update data", updateData);
    // const updateUserHistory = await db.history.update({
    //   where: { id: id },
    //   data: updateData,
    // });
    // console.log("User history updated", updateUserHistory);
    // revalidatePath("/", "layout");
    // return updateUserHistory;
  } catch (error) {
    console.error(error);
  }
};
