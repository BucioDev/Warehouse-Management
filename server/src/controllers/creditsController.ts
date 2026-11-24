import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


export const getCredits = async (req:Request, res:Response): Promise<void> => {
    try {
        const search = req.query.search?.toString();
        const credits = await prisma.credits.findMany({
            where:{
                id:{
                    contains: search,
                }
            },
            orderBy:{
                remainingDebt:"desc"
            },
            include:{
                Installments:true,
            },
        });

        res.json(credits)

    } catch(err) {
        res.status(500).json({message:"Error retriving Credits"})
        console.log(err);
    }
} 

export const createCredit = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, totalDebt,  periods  } = req.body;


      
            const newcredit = await prisma.credits.create({
                data: {
                    name, 
                    totalDebt,
                    debtPaid:0,
                    remainingDebt:totalDebt,
                    periods,
                },
            });

        res.status(201).json(newcredit);

    } catch (err) {
        console.error("Error creating credit:", err);
        res.status(500).json({ message: "Error creating credit" });
    }
};

export const creditAddDebt = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, newDebt } = req.body;

            const updatedCredit = await prisma.credits.update({
                where:{
                    id
                },
                data: {
                    totalDebt:{
                        increment:newDebt
                    },
                    remainingDebt:{
                        increment:newDebt
                    },
                },
            });

        res.status(201).json(updatedCredit);

    } catch (err) {
        console.error("Error updating credit:", err);
        res.status(500).json({ message: "Error updating credit" });
    }
};

export const creditChangePeriods = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, newPeriod } = req.body;
        console.log("New period: " , newPeriod);

            const updatedCredit = await prisma.credits.update({
                where:{
                    id
                },
                data: {
                    periods:newPeriod
                },
            });

        res.status(201).json(updatedCredit);

    } catch (err) {
        console.error("Error updating credit:", err);
        res.status(500).json({ message: "Error updating credit" });
    }
};
