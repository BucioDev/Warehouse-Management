import cron from "node-cron";
import { generateExpenseSummary } from "../services/expenseSummaryService.js";

export function startExpenseSummaryJobs() {
    cron.schedule("10 0 * * 1", async () => {
        try {
            console.log("Generating weekly expense summary...");
            await generateExpenseSummary("WEEKLY");
            console.log("Weekly expense summary completed.");
        } catch (error) {
            console.error("Weekly expense summary failed:", error);
        }
    }, {
        timezone: "America/Tijuana",
    });

    cron.schedule("10 0 1 * *", async () => {
        try {
            console.log("Generating monthly expense summary...");
            await generateExpenseSummary("MONTHLY");
            console.log("Monthly expense summary completed.");
        } catch (error) {
            console.error("Monthly expense summary failed:", error);
        }
    }, {
        timezone: "America/Tijuana",
    });
}