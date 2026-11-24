import e, { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


export const getDashboardMetricts = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const saleSummary = await prisma.salesSummary.findMany({
            take:5,
            orderBy:{
                createdAt:"desc",
            },
        });
        const expenseSummary = await prisma.expensesSummary.findMany({
            take:5,
            orderBy:{
                createdAt:"desc",
            },
        });
        const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
            {
              take: 5,
              orderBy: {
                date: "desc",
              },
            }
          );
          const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
            (item:any) => ({
              ...item,
              amount: item.amount.toString(),
            })
          );

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
            expenseByCategorySummary,
            credits,
        });
    } catch (err) {
        res.status(500).json({message:"Error retrieving dashboard metrics"});
        console.log("Error: ", err)
    }
};