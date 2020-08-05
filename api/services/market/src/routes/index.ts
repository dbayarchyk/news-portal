import { Router } from "express";
import { router as citiesRouter } from "./cities";
import { router as positionsRouter } from "./positions";
import { router as technologiesRouter } from "./technologies";

export const router = Router();

router.use("/cities", citiesRouter);
router.use("/positions", positionsRouter);
router.use("/technologies", technologiesRouter);
