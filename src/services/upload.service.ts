import cloudinary from "../lib/cloudinary";

export async function uploadImage(
  buffer: Buffer
): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream =
      cloudinary.uploader.upload_stream(
        {
          folder: "describeai",
        },

        (error, result) => {
          if (error || !result) {
            reject(error);

            return;
          }

          resolve(result.secure_url);
        }
      );

    stream.end(buffer);
  });
}