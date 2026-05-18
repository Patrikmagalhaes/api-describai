import { Router } from "express";

import upload from "../middlewares/upload.middleware";

import { generate } from "../controllers/generation.controller";

const router = Router();

router.post(
  "/",
  upload.single("image"),
  generate
);

export default router;