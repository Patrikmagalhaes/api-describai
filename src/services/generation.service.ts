import { uploadImage } from "./upload.service";

import { generateAltWithAI } from "./ai.service";

import { createGeneration } from "../repositories/generation.repository";

type GenerateAltRequest = {
  filePath: string;
  language: string;
  tone: string;
  size: string;
};

export async function generateAltService({
  filePath,
  language,
  tone,
  size,
}: GenerateAltRequest) {




  // upload cloudinary
  const imageUrl = await uploadImage(filePath);

  // IA Gemini
  const altText = await generateAltWithAI({
    filePath,
    language,
    tone,
    size,
  });

  const generation = await createGeneration({
    imageUrl,

    altText: altText || "",

    language,
    tone,
    size,
  });

  return generation;
}