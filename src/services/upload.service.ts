import cloudinary from "../lib/cloudinary";

export async function uploadImage(
  filePath: string
) {
  const response =
    await cloudinary.uploader.upload(filePath, {
      folder: "describeai",
    });

  return response.secure_url;
}