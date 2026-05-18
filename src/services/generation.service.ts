import { uploadImage } from "./upload.service";

import { createGeneration } from "../repositories/generation.repository";

type GenerateAltRequest = {
  filePath: string;
};

export async function generateAltService({
  filePath,
}: GenerateAltRequest) {
  // upload cloudinary
  const imageUrl = await uploadImage(filePath);

  // fake alt temporário
  const fakeAlt =
    "Pessoa utilizando notebook em uma mesa.";

  const generation = await createGeneration({
    imageUrl,
    altText: fakeAlt,
    language: "pt-BR",
    tone: "natural",
    size: "medium",
  });

  return generation;
}