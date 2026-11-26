import { SummaryPeriod } from "../../generated/prisma/enums.js";

export function getPreviousPeriod(period: SummaryPeriod) {
    const now = new Date();

    let startDate: Date;
    let endDate: Date;

    if (period === "WEEKLY") {
        endDate = new Date(now);
        endDate.setHours(0, 0, 0, 0);

        const daysSinceMonday = (endDate.getDay() + 6) % 7;

        endDate.setDate(endDate.getDate() - daysSinceMonday);

        startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 7);
    } else {
        endDate = new Date(now.getFullYear(), now.getMonth(), 1);

        startDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth() - 1,
            1
        );
    }

    return { startDate, endDate };
}