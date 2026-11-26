import { Prisma } from "../../generated/prisma/client.js";
import { SummaryPeriod } from "../../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";

export async function generateExpenseSummary(period: SummaryPeriod) {
    const { startDate, endDate } = getPreviousPeriod(period);

    const groupedExpenses = await prisma.expenses.groupBy({
        by: ["category"],
        where: {
            createdAt: {
                gte: startDate,
                lt: endDate,
            },
        },
        _sum: {
            amount: true,
        },
    });

    const totalExpense = groupedExpenses.reduce(
        (total:any, expense:any) =>
            total.add(expense._sum.amount ?? new Prisma.Decimal(0)),
        new Prisma.Decimal(0)
    );

    const summary = await prisma.expensesSummary.upsert({
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
            totalExpense,
            ExpenseByCategory: {
                create: groupedExpenses.map((expense:any) => ({
                    category: expense.category,
                    amount: expense._sum.amount ?? new Prisma.Decimal(0),
                })),
            },
        },
    });

    return summary;
}

function getPreviousPeriod(period: SummaryPeriod) {
    const now = new Date();

    let startDate: Date;
    let endDate: Date;

    if (period === "WEEKLY") {
        // Monday of the current week
        endDate = new Date(now);
        endDate.setHours(0, 0, 0, 0);

        const day = endDate.getDay();
        const daysSinceMonday = (day + 6) % 7;

        endDate.setDate(endDate.getDate() - daysSinceMonday);

        // Previous Monday
        startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 7);
    } else {
        // First day of current month
        endDate = new Date(now.getFullYear(), now.getMonth(), 1);

        // First day of previous month
        startDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth() - 1,
            1
        );
    }

    return { startDate, endDate };
}