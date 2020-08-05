import { Router } from "express";
import { router as citiesRouter } from "./cities";

export const router = Router();

router.use("/cities", citiesRouter);
