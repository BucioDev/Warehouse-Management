import { Router } from "express";
import { createExpense, getExpenses, getGroupedExpenses } from "../controllers/expensesController.js";

const router = Router();

router.get("/", getExpenses);
router.post("/", createExpense);
router.get("/grouped", getGroupedExpenses)

export default router
