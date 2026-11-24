import { Router } from "express";
import { createExit, getExits, getGroupedExits } from "../controllers/exitsController.js";

const router = Router();

router.get("/", getExits);
router.post("/", createExit);
router.get("/grouped", getGroupedExits)

export default router
