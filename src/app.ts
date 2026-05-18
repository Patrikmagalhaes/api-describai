import express from "express";
import cors from "cors";

import testRoutes from "./routes/test.routes";
import generationRoutes from "./routes/generation.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/test", testRoutes);
app.use("/generations", generationRoutes);

export default app;