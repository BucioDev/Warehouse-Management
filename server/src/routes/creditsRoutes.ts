import { Router } from "express";
import { createCredit, creditAddDebt, creditChangePeriods, getCredits } from "../controllers/creditsController.js";

const router = Router();

router.get("/", getCredits);
router.post("/", createCredit);
router.post("/add-debt", creditAddDebt)
router.post("/change-period", creditChangePeriods)

export default router
