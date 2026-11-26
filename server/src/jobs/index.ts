import { startExpenseSummaryJobs } from "./expenseSummary.js";
import { startSalesSummaryJobs } from "./salesSummary.js";

export function startScheduledJobs() {
    startExpenseSummaryJobs();
    startSalesSummaryJobs();

    console.log("--------------------------------");
    console.log("Scheduled jobs initialized");
    console.log("Weekly summaries: Every Monday");
    console.log("Monthly summaries: First day");
    console.log("Timezone: America/Tijuana");
    console.log("--------------------------------");
}