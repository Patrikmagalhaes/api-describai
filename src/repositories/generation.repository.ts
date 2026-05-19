import prisma from "../lib/prisma";

type CreateGenerationData = {
  imageUrl: string;

  altText: string;

  caption: string;

  seoDescription: string;

  html: string;

  keywords: string[];

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