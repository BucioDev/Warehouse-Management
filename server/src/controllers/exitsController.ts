import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


export const getExits = async (red:Request, res:Response): Promise<void> => {
    try {
        const exits = await prisma.exits.findMany({
            orderBy:{
                createdAt:"desc"
            },
            include:{
                product:true,
            },
        });

        res.json(exits)

    } catch(err) {
        res.status(500).json({message:"Error retriving Exits"})
        console.log(err);
    }
} 

export const getGroupedExits = async (req:Request, res: Response): Promise<void> => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const groupedExits = await prisma.exits.groupBy({
            by:["productId"],
            where:{
                createdAt:{
                    gte:startOfMonth,
                    lte:now,
                },
            },
            _sum:{
                quantity:true,
            },
            _count:{
                id:true
            },
        });

        const productsIds = groupedExits.map((item:any) => item.productId);
        const products = await prisma.products.findMany({
            where:{
                id:{in:productsIds},
            },
        });

        const result = groupedExits.map((exit:any) => ({
            ...exit,
            product: products.find((p:any) => p.id === exit.productId) ?? null,
        }));

        res.json(result);


    } catch(err) {
        res.status(500).json({message:"Error retriving Exits"})
        console.log(err);
    }
}

export const createExit = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId, quantity  } = req.body;


        const exit = await prisma.$transaction(async (tx:any) => {
            const newExit = await tx.exits.create({
                data: {
                    productId,
                    quantity: Number(quantity),
                },
            });

            await tx.products.update({
                where: { id: productId },
                data: {
                    stock: {
                        decrement: Number(quantity),
                    },
                },
            });


            return newExit;
        });

        

        res.status(201).json(exit);

    } catch (err) {
        console.error("Error creating exit:", err);
        res.status(500).json({ message: "Error creating exit" });
    }
};