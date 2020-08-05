import { Router } from "express";
import { router as citiesRouter } from "./cities";
import { router as positionsRouter } from "./positions";

export const router = Router();

router.use("/cities", citiesRouter);
router.use("/positions", positionsRouter);
