import { Router } from "express";
import { router as commentsRouter } from "./comments";

export const router = Router();

router.use("/comments", commentsRouter);
