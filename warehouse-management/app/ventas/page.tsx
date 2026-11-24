"use client"

import { useState } from "react";
import Header from "../components/Header";
import { PlusCircleIcon } from "lucide-react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCreateSaleMutation, useGetSalesQuery } from "@/state/api";
import GroupedSales from "../components/groupedSales";
import CreateSaleModalForm from "../components/Forms/createSaleModalForm";

const columns: GridColDef[] = [
    {
        field: "productName",
        headerName: "Nombre de Producto",
        width: 200,
        valueGetter: (value, row) => row.product.name,
      },
      {
        field: "quantity",
        headerName: "Cantidad",
        width: 150,
        type: "number",
      },
      {
        field: "unitPrice",
        headerName: "Precio de venta por unidad",
        width: 150,
        type: "number",
        valueGetter: (value, row) => `$${row.unitPrice}`,
      },
      {
        field: "totalAmount",
        headerName: "Precio de Compra total",
        width: 150,
        type: "number",
      },
]

type SaleFormData = {
    productId: string;
    quantity: number;
    unitPrice: number;
}

export default function salesPage(){
const {data: sales, isError, isLoading} = useGetSalesQuery();
const [isModalOpen, setIsModalOpen] = useState(false);

const [createSale] = useCreateSaleMutation();

const handleCreateSale = async (saleData: SaleFormData) => {
    await createSale(saleData);
}

if(isLoading) {
    return <div className="py-4">Cargando...</div>
}
if(isError || !sales) {
return <div className="texts-center text-red-500 py-4">
    Fallo al cargar las Ventas
</div>
}

return (
    <div className="flex flex-col">
        <div className="flex justify-between items-center mb-6">
            <Header name="Ventas"/>
            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}>
                <PlusCircleIcon className="h-5 w-5 mr-2 text-gray-200!"/> Agregar Venta
            </button>
            
            
        </div>

        <GroupedSales />
        
        <DataGrid
            rows={sales}
            columns={columns}
            getRowId={(row) => row.id}
            className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        />

        <CreateSaleModalForm  isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateSale}/>
    </div>
)

}