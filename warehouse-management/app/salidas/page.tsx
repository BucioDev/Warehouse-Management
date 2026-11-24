"use client"

import { useCreateExitMutation, useGetExitsQuery } from "@/state/api"
import { useState } from "react";
import Header from "../components/Header";
import { PlusCircleIcon } from "lucide-react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CreateExitModalForm from "../components/Forms/CreateExitModalForm";
import GroupedExits from "../components/groupedExits";

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
]

type ExitFormData = {
    productId: string;
    quantity: number;
}

export default function exitsPage(){
const {data: exits, isError, isLoading} = useGetExitsQuery();
const [isModalOpen, setIsModalOpen] = useState(false);

const [createExit] = useCreateExitMutation();

const handleCreateExit = async (exitData: ExitFormData) => {
    await createExit(exitData);
}

if(isLoading) {
    return <div className="py-4">Cargando...</div>
}
if(isError || !exits) {
return <div className="texts-center text-red-500 py-4">
    Fallo al cargar las Salidas
</div>
}

return (
    <div className="flex flex-col">
        <div className="flex justify-between items-center mb-6">
            <Header name="Salidas"/>
            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}>
                <PlusCircleIcon className="h-5 w-5 mr-2 text-gray-200!"/> Agregar Salida
            </button>
            
            
        </div>

        <GroupedExits />
        
        <DataGrid
            rows={exits}
            columns={columns}
            getRowId={(row) => row.id}
            className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
        />

        <CreateExitModalForm  isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateExit}/>
    </div>
)

}