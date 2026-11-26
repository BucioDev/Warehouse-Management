import e, { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


export const getDashboardMetricts = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const [weeklySales, monthlySales] = await Promise.all([
            prisma.salesSummary.findMany({
                where: { period: "WEEKLY" },
                orderBy: { startDate: "desc" },
                take: 5,
            }),
            prisma.salesSummary.findMany({
                where: { period: "MONTHLY" },
                orderBy: { startDate: "desc" },
                take: 5,
            }),
        ]);
        
        const saleSummary = [...weeklySales, ...monthlySales];

        const [weeklyExpenses, monthlyExpenses] = await Promise.all([
    prisma.expensesSummary.findMany({
        where: { period: "WEEKLY" },
        orderBy: { startDate: "desc" },
        take: 5,
        include: {
            ExpenseByCategory: true,
        },
    }),
    prisma.expensesSummary.findMany({
        where: { period: "MONTHLY" },
        orderBy: { startDate: "desc" },
        take: 5,
        include: {
            ExpenseByCategory: true,
        },
    }),
]);

const expenseSummary = [...weeklyExpenses, ...monthlyExpenses];

          const credits = await prisma.credits.findMany({
            where: {
                remainingDebt: {
                    gte: 0,
                }
            },
            orderBy: {
                name: "asc",
            },
            include: {
                Installments: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 1,
                },
            },
        });

        res.json({
            saleSummary,
            expenseSummary,
            credits,
        });
    } catch (err) {
        res.status(500).json({message:"Error retrieving dashboard metrics"});
        console.log("Error: ", err)
    }
};