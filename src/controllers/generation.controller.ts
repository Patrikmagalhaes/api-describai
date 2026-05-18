import { Request, Response } from "express";

import { generateAltService } from "../services/generation.service";

export async function generate(
  req: Request,
  res: Response
) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        error: "Image is required",
      });
    }

    const result = await generateAltService({
      filePath: file.path,
    });

    return res.json(result);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}