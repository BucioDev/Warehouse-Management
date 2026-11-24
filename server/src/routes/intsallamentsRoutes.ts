import { Router } from "express";
import { createInstallments, getInstallments } from "../controllers/installmentsController.js";

const router = Router();

router.get("/", getInstallments);
router.post("/", createInstallments);

export default router
