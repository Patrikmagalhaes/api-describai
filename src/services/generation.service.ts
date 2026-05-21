import { uploadImage } from "./upload.service";

import { generateAltWithAI } from "./ai.service";

import { createGeneration } from "../repositories/generation.repository";

type GenerateAltRequest = {
  buffer: Buffer;

  mimeType: string;

  language: string;

  tone: string;

  size: string;
};

export async function generateAltService({
  buffer,
  mimeType,
  language,
  tone,
  size,
}: GenerateAltRequest) {
  try {

    // 1. upload cloudinary
    const imageUrl =
      await uploadImage(buffer);

    // 2. IA
    const aiResult =
      await generateAltWithAI({
        imageUrl,

        language,
        tone,
        size,
      });

    if (!aiResult?.altText) {
      throw new Error(
        "Failed generating ALT description"
      );
    }

    // 3. save db
    const generation =
      await createGeneration({
        imageUrl,

        altText: aiResult.altText,

        caption: aiResult.caption,

        seoDescription:
          aiResult.seoDescription,

        html: aiResult.html,

        keywords: aiResult.keywords,

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
  }
}