import { Router } from "express";
import { createSale, getGroupedSales, getSales } from "../controllers/salesController.js";

const router = Router();

router.get("/", getSales);
router.post("/", createSale);
router.get("/grouped", getGroupedSales)

export default router
