"use client"

import { useCreateEntryMutation, useGetEntrysQuery } from "@/state/api"
import { useState } from "react";
import Header from "../components/Header";
import { PlusCircleIcon } from "lucide-react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CreateEntryModalForm from "../components/Forms/createEntryModalForm";
import GroupedEntrys from "../components/groupedEntrys";

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
        field: "buyPrice",
        headerName: "Precio de Compra por unidad",
        width: 250,
        type: "number",
        valueGetter: (value, row) => `$${row.buyPrice}`,
      },
      {
        field: "totalPrice",
        headerName: "Precio de Compra total",
        width: 150,
        type: "number",
      },
]

type EntryFormData = {
    productId: string;
    quantity: number;
    buyPrice: number;
}

export default function entrysPage(){
const {data: entrys, isError, isLoading} = useGetEntrysQuery();
const [isModalOpen, setIsModalOpen] = useState(false);

const [createEntry] = useCreateEntryMutation();

const handleCreateEntry = async (entryData: EntryFormData) => {
    await createEntry(entryData);
}

if(isLoading) {
    return <div className="py-4">Cargando...</div>
}
if(isError || !entrys) {
return <div className="texts-center text-red-500 py-4">
    Fallo al cargar las entradas
</div>
}

return (
    <div className="flex flex-col">
        <div className="flex justify-between items-center mb-6">
            <Header name="Entradas"/>
            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}>
                <PlusCircleIcon className="h-5 w-5 mr-2 text-gray-200!"/> Agregar Entrada
            </button>
            
            
        </div>

        <GroupedEntrys />
        
        <DataGrid
            rows={entrys}
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

        <CreateEntryModalForm  isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateEntry}/>
    </div>
)

}