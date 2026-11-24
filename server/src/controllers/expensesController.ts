import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


export const getExpenses = async (red:Request, res:Response): Promise<void> => {
    try {
        const expenses = await prisma.expenses.findMany({
            orderBy:{
                createdAt:"desc"
            },
        });

        res.json(expenses)

    } catch(err) {
        res.status(500).json({message:"Error retriving Expenses"})
        console.log(err);
    }
} 

export const getGroupedExpenses = async (req:Request, res: Response): Promise<void> => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const groupedExpenses = await prisma.expenses.groupBy({
            by:["category"],
            where:{
                createdAt:{
                    gte:startOfMonth,
                    lte:now,
                },
            },
            _sum:{
                amount:true,
            },
            _count:{
                id:true
            },
        });

        res.json(groupedExpenses);


    } catch(err) {
        res.status(500).json({message:"Error retriving Expenses"})
        console.log(err);
    }
}

export const createExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category, amount  } = req.body;

            const newExpense = await prisma.expenses.create({
                data: {
                    category,
                    amount,
                },
            });

        res.status(201).json(newExpense);

    } catch (err) {
        console.error("Error creating expense:", err);
        res.status(500).json({ message: "Error creating expense" });
    }
};