import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


export const getSales = async (req:Request, res: Response): Promise<void> => {
    try {
        const sales = await prisma.sales.findMany({
            orderBy:{
                CreatedAt:"desc"
            },
            include:{
                product:true,
            }
        });

        res.json(sales);

    } catch(err) {
        res.status(500).json({message:"Error retriving Sales"})
        console.log(err);
    }
}

export const getGroupedSales = async (req:Request, res: Response): Promise<void> => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const groupedSales = await prisma.sales.groupBy({
            by:["productId"],
            where:{
                CreatedAt:{
                    gte:startOfMonth,
                    lte:now,
                },
            },
            _sum:{
                quantity:true,
                totalAmount: true,
            },
            _avg:{
                unitPrice:true,
            },
            _count:{
                id:true
            },
        });

        const productsIds = groupedSales.map((item:any) => item.productId);
        const products = await prisma.products.findMany({
            where:{
                id:{in:productsIds},
            },
        });

        const result = groupedSales.map((sale:any) => ({
            ...sale,
            product: products.find((p:any) => p.id === sale.productId) ?? null,
        }));

        res.json(result);


    } catch(err) {
        res.status(500).json({message:"Error retriving Sales"})
        console.log(err);
    }
}

export const createSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId, quantity, unitPrice } = req.body;

        const totalAmount = Number (quantity * unitPrice);

       
            const newSale = await prisma.sales.create({
                data: {
                    productId,
                    quantity: Number(quantity),
                    unitPrice: Number(unitPrice),
                    totalAmount
                },
            });



        

        res.status(201).json(newSale);

    } catch (err) {
        console.error("Error creating Sale:", err);
        res.status(500).json({ message: "Error creating Sale" });
    }
};