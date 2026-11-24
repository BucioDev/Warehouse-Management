import { Router } from "express";
import { getDashboardMetricts } from "../controllers/dashboardController.js";

const router = Router();

router.get("/", getDashboardMetricts);

export default router
