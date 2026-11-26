import cron from "node-cron";
import { generateSalesSummary } from "../services/salesSummaryService.js";

export function startSalesSummaryJobs() {
    cron.schedule("10 0 * * 1", async () => {
        try {
            console.log("Generating weekly sales summary...");
            await generateSalesSummary("WEEKLY");
            console.log("Weekly sales summary completed.");
        } catch (error) {
            console.error("Weekly sales summary failed:", error);
        }
    }, {
        timezone: "America/Tijuana",
    });

    cron.schedule("10 0 1 * *", async () => {
        try {
            console.log("Generating monthly sales summary...");
            await generateSalesSummary("MONTHLY");
            console.log("Monthly sales summary completed.");
        } catch (error) {
            console.error("Monthly sales summary failed:", error);
        }
    }, {
        timezone: "America/Tijuana",
    });
}