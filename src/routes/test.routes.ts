import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "DescribeAI API running",
  });
});

export default router;