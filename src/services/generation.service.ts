import fs from "fs";
import { uploadImage } from "./upload.service";
import { generateAltWithAI } from "./ai.service";
import { createGeneration } from "../repositories/generation.repository";

type GenerateAltRequest = {
  filePath: string;

  mimeType: string;

  language: string;
  tone: string;
  size: string;
};

export async function generateAltService({
  filePath,
  mimeType,
  language,
  tone,
  size,
}: GenerateAltRequest) {
  try {
    // 1. IA
    const altText =
      await generateAltWithAI({
        filePath,
        mimeType,
        language,
        tone,
        size,
      });

    if (!altText) {
      throw new Error(
        "Failed generating ALT description"
      );
    }

    // 2. upload cloudinary
    const imageUrl =
      await uploadImage(filePath);

    // 3. save db
    const generation =
      await createGeneration({
        imageUrl,

        altText,

        language,
        tone,
        size,
      });

    return generation;
  } catch (error) {
    console.log(error);

    throw new Error(
      "Error generating description"
    );
  } finally {
    // cleanup local
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}