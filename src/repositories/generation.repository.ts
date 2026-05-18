import prisma from "../lib/prisma";

type CreateGenerationData = {
  imageUrl: string;
  altText: string;
  language: string;
  tone: string;
  size: string;
};

export async function createGeneration(
  data: CreateGenerationData
) {
  return prisma.generation.create({
    data,
  });
}