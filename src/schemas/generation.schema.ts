import { z } from "zod";

export const generationSchema = z.object({
  language: z.string(),

  tone: z.enum([
    "natural",
    "formal",
    "seo",
    "detailed",
  ]),

  size: z.enum([
    "short",
    "medium",
    "long",
  ]),
});