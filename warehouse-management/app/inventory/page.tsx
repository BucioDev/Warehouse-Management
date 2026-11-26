"use client"

import { useCreateProductMutation, useGetProductsQuery } from "@/state/api"
import Header from "../components/Header";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import CreateProductModalForm from "../components/Forms/CreateProductModalForm";

const columns: GridColDef[] = [
    { field: "id", headerName: "Codigo", width: 150 },
    { field: "name", headerName: "Nombre de Producto", width: 200 },
    {
      field: "price",
      headerName: "Precio",
      width: 150,
      type: "number",
      valueGetter: (value, row) => `$${row.price}`,
    },
    {
      field: "stock",
      headerName: "Cantidad en stock",
      width: 150,
      type: "number",
    },
  ];

  type ProductFormData = {
    id: string;
    name: string;
    price: number;
    stock: number;
}


export default function InventoryPage(){
    
    const { data: products, isError, isLoading } = useGetProductsQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [createProduct] = useCreateProductMutation();

    const handleCreateProduct = async (productData: ProductFormData) => {
        await createProduct(productData);
    }

    if (isLoading) {
        return <div className="py-4">Cargando...</div>
    }
    if (isError || !products) {
        return <div className="text-center text-red-500 py-4">
            Fallo al cargar los productos
        </div>
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
            <Header name="Inventario"/>
            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}>
                <PlusCircleIcon className="h-5 w-5 mr-2 text-gray-200!"/> Agregar Producto
            </button>
            </div>
            <DataGrid
            rows={products}
            columns={columns}
            getRowId={(row) => row.id}
            className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
            sx={{
                fontSize: "1rem",
                "& .MuiDataGrid-columnHeaderTitle": {
                    fontSize: "1rem",
                    fontWeight: 600,
                },
                "& .MuiDataGrid-cell": {
                    fontSize: "1rem",
                },
            }}/>
        <CreateProductModalForm  isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}/>
        
        </div>
    )
}