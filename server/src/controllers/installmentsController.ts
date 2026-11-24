import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


export const getInstallments = async (req:Request, res:Response): Promise<void> => {
    
    try {
        const search = req.query.search?.toString();
        const installments = await prisma.instalments.findMany({
            where:{
                creditId:search,
            },
            orderBy:{
                createdAt:"desc"
            },
        });

        res.json(installments)

    } catch(err) {
        res.status(500).json({message:"Error retriving Installments"})
        console.log(err);
    }
} 
export const createInstallments = async (req: Request, res: Response): Promise<void> => {
    try {
        const { creditId, amount} = req.body;

        const entry = await prisma.$transaction(async (tx:any) => {
            const newInstallment = await tx.instalments.create({
                data: {
                    creditId,
                    amount,
                },
            });

            await tx.credits.update({
                where: { id: creditId },
                data: {
                    debtPaid: {
                        increment: amount,
                    },
                    remainingDebt: {
                        decrement: amount,
                    },
                },
            });

            return newInstallment;
        });

        

        res.status(201).json(entry);

    } catch (err) {
        console.error("Error creating instalment:", err);
        res.status(500).json({ message: "Error creating instalment" });
    }
};