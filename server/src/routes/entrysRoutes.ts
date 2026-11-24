import { Router } from "express";
import { createEntry, getEntrys, getGroupedEntrys } from "../controllers/entrysController.js";

const router = Router();

router.get("/", getEntrys);
router.post("/", createEntry);
router.get("/grouped", getGroupedEntrys)

export default router
