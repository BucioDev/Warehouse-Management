import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


export const getEntrys = async (req:Request, res: Response): Promise<void> => {
    try {
        const entrys = await prisma.entrys.findMany({
            orderBy:{
                createdAt:"desc"
            },
            include:{
                product:true,
            }
        });

        res.json(entrys);

    } catch(err) {
        res.status(500).json({message:"Error retriving Entrys"})
        console.log(err);
    }
}

export const getGroupedEntrys = async (req:Request, res: Response): Promise<void> => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const groupedEntrys = await prisma.entrys.groupBy({
            by:["productId"],
            where:{
                createdAt:{
                    gte:startOfMonth,
                    lte:now,
                },
            },
            _sum:{
                quantity:true,
                totalPrice: true,
            },
            _avg:{
                buyPrice:true,
            },
            _count:{
                id:true
            },
        });

        const productsIds = groupedEntrys.map((item:any) => item.productId);
        const products = await prisma.products.findMany({
            where:{
                id:{in:productsIds},
            },
        });

        const result = groupedEntrys.map((entry:any) => ({
            ...entry,
            product: products.find((p:any) => p.id === entry.productId) ?? null,
        }));

        res.json(result);


    } catch(err) {
        res.status(500).json({message:"Error retriving Entrys"})
        console.log(err);
    }
}

export const createEntry = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId, quantity, buyPrice } = req.body;

        const totalPrice = Number (quantity * buyPrice);

        const entry = await prisma.$transaction(async (tx:any) => {
            const newEntry = await tx.entrys.create({
                data: {
                    productId,
                    quantity: Number(quantity),
                    buyPrice: Number(buyPrice),
                    totalPrice
                },
            });

            await tx.products.update({
                where: { id: productId },
                data: {
                    stock: {
                        increment: Number(quantity),
                    },
                },
            });

            await tx.expenses.create({
                data:{
                    category:"Compra de Producto",
                    amount:totalPrice,
                },
        })

            return newEntry;
        });

        

        res.status(201).json(entry);

    } catch (err) {
        console.error("Error creating entry:", err);
        res.status(500).json({ message: "Error creating entry" });
    }
};