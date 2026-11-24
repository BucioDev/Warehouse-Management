import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


export const getProducts = async (req:Request, res:Response): Promise<void> => {
    try {
        const search = req.query.search?.toString();
        const products = await prisma.products.findMany({
            where:{
                name:{
                    contains:search
                },
            },
        });

        res.json(products);

    } catch (err) {
        res.status(500).json({message:"Error retriving products"})
    }
}


export const createProduct = async (req: Request, res: Response):Promise<void> => {
    try{
        const {id, name, price, stock } = req.body;
        const product = await prisma.products.create({
            data:{
                id,
                name,
                price,
                stock,
            },
        });
        res.status(201).json(product);
        
    } catch (err) {
        res.status(500).json({message:"Error creating product"})
    }
}