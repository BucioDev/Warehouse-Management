"use client"

import { useState } from "react";
import Header from "../components/Header";
import { PlusCircleIcon } from "lucide-react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCreateExpenseMutation, useGetExpensesQuery } from "@/state/api";
import GroupedExpenses from "../components/groupedExpenses";
import CreateExpenseModalForm from "../components/Forms/CreateExpenseModalForm";

const columns: GridColDef[] = [
    {
        field: "category",
        headerName: "Categoria del gasto",
        width: 200,
      },
      {
        field: "amount",
        headerName: "Cantidad",
        width: 150,
        type: "number",
      },
]

type ExpenseFormData = {
    category: string;
    amount: number;
}

export default function exitsPage(){
const {data: expenses, isError, isLoading} = useGetExpensesQuery();
const [isModalOpen, setIsModalOpen] = useState(false);

const [createExit] = useCreateExpenseMutation();

const handleCreateExpense = async (exitData: ExpenseFormData) => {
    await createExit(exitData);
}

if(isLoading) {
    return <div className="py-4">Cargando...</div>
}
if(isError || !expenses) {
return <div className="texts-center text-red-500 py-4">
    Fallo al cargar los Gastos
</div>
}

return (
    <div className="flex flex-col">
        <div className="flex justify-between items-center mb-6">
            <Header name="Gastos"/>
            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}>
                <PlusCircleIcon className="h-5 w-5 mr-2 text-gray-200!"/> Agregar Gasto
            </button>
            
            
        </div>

        <GroupedExpenses />
        
        <DataGrid
            rows={expenses}
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

        <CreateExpenseModalForm  isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateExpense}/>
    </div>
)

}