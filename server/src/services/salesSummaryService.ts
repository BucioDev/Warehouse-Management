import { Prisma } from "../../generated/prisma/client.js";
import { SummaryPeriod } from "../../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";
import { getPreviousPeriod } from "../lib/summaryPeriod.js";

export async function generateSalesSummary(period: SummaryPeriod) {
    const { startDate, endDate } = getPreviousPeriod(period);

    // Previous period for comparison
    const previousEndDate = startDate;
    const previousStartDate = getPreviousPeriodStart(period, startDate);

    const [currentSales, previousSales] = await Promise.all([
        prisma.sales.aggregate({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
            _sum: {
                totalAmount: true,
            },
        }),
        prisma.sales.aggregate({
            where: {
                createdAt: {
                    gte: previousStartDate,
                    lt: previousEndDate,
                },
            },
            _sum: {
                totalAmount: true,
            },
        }),
    ]);

    const totalValue =
        currentSales._sum.totalAmount ?? new Prisma.Decimal(0);

    const previousValue =
        previousSales._sum.totalAmount ?? new Prisma.Decimal(0);

    let changePercentage: number | null = null;

    if (!previousValue.isZero()) {
        changePercentage = totalValue
            .minus(previousValue)
            .dividedBy(previousValue)
            .times(100)
            .toNumber();
    }

    const summary = await prisma.salesSummary.upsert({
        where: {
            period_startDate_endDate: {
                period,
                startDate,
                endDate,
            },
        },
        update: {},
        create: {
            period,
            startDate,
            endDate,
            totalValue,
            changePercentage,
        },
    });

    return summary;
}

function getPreviousPeriodStart(period: SummaryPeriod, endDate: Date) {
    if (period === "WEEKLY") {
        const start = new Date(endDate);
        start.setDate(start.getDate() - 7);
        return start;
    }

    return new Date(
        endDate.getFullYear(),
        endDate.getMonth() - 1,
        1
    );
}