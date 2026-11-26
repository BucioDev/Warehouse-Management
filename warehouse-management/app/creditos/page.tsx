"use client"

import { useState } from "react";
import Header from "../components/Header";
import { PlusCircleIcon } from "lucide-react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCreateCreditMutation, useCreateInstallmentMutation, useGetCreditsQuery, useUpdateCreditPeriodMutation } from "@/state/api";
import CreateCreditModalForm from "../components/Forms/createCreditModalForm";
import AddPaymentModalForm from "../components/Forms/AddPaymentModalForm";
import UpdatePaymentPeriodModalForm from "../components/Forms/UpdatePaymentPeriodModalForm";
import Link from "next/link";



type CreditsFormData = {
    name:          string;
    totalDebt:     number;
    periods:       number;
}
type InstallmentFormData = {
    creditId: string;
    amount: number;
}
type periodFormData = {
    id: string;
    newPeriod: number;
}

export default function creditsPage(){
const {data: credits, isError, isLoading} = useGetCreditsQuery();
const [isModalOpen, setIsModalOpen] = useState(false);
const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
const [isUpdatePeriodModalOpen, setIsUpdatePeriodModalOpen] = useState(false);
const [selectedCreditId, setSelectedCreditId] = useState<string | null>(null);

const [createCredit] = useCreateCreditMutation();
const [addPayment] = useCreateInstallmentMutation();
const [updatePeriod] = useUpdateCreditPeriodMutation();

const handleCreateCredit = async (creditData: CreditsFormData) => {
    await createCredit(creditData);
}

const handleCreatePayment = async (installmentData: InstallmentFormData) => {
    await addPayment(installmentData);
};

const handleUpdatePeriod = async (periodData: periodFormData) => {
    await updatePeriod(periodData);
};


const columns: GridColDef[] = [
    {
        field: "name",
        headerName: "Nombre del Cliente ",
        width: 200,
      },
      {
        field: "totalDebt",
        headerName: "Deuda total",
        width: 150,
        type: "number",
      },
      {
        field: "debtPaid",
        headerName: "Deuda pagada",
        width: 150,
        type: "number",
      },
      {
        field: "remainingDebt",
        headerName: "Deuda Faltante a pagar",
        width: 150,
        type: "number",
      },
      {
        field: "periods",
        headerName: "Periodo entre pagos",
        width: 150,
        type: "number",
      },
      {
        field: "payment",
        headerName: "Agregar Pago",
        width: 150,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
            <button onClick={() => {
                setSelectedCreditId(params.row.id);
                setIsPaymentModalOpen(true);
            }} className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded">
            Agregar Pago
            </button>
        )
      },
      {
        field: "updatePeriods",
        headerName: "Actualizar periodo de Pago",
        width: 200,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
            <button onClick={() => {
                setSelectedCreditId(params.row.id);
                setIsUpdatePeriodModalOpen(true);
            }} className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded">
            Actualizar periodo de Pago
            </button>
        )
      },
      {
        field: "installments",
        headerName: "Ver Pagos",
        width: 150,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
            <Link
                href={`/creditos/${params.row.id}`}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded inline-block"
            >
                Ver Pagos
            </Link>
        ),
    },
]

if(isLoading) {
    return <div className="py-4">Cargando...</div>
}
if(isError || !credits) {
return <div className="texts-center text-red-500 py-4">
    Fallo al cargar los Creditos
</div>
}

return (
    <div className="flex flex-col">
        <div className="flex justify-between items-center mb-6">
            <Header name="Creditos"/>
            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}>
                <PlusCircleIcon className="h-5 w-5 mr-2 text-gray-200!"/> Agregar Credito
            </button>
            
            
        </div>

        
        <DataGrid
            rows={credits}
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

        <CreateCreditModalForm  isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateCredit}/>

        {selectedCreditId && (
            <>
                <AddPaymentModalForm
                    creditId={selectedCreditId}
                    isOpen={isPaymentModalOpen}
                    onClose={() => {
                        setIsPaymentModalOpen(false);
                        setSelectedCreditId(null);
                    }}
                    onCreate={handleCreatePayment}
                />

                <UpdatePaymentPeriodModalForm
                    creditId={selectedCreditId}
                    isOpen={isUpdatePeriodModalOpen}
                    onClose={() => {
                        setIsUpdatePeriodModalOpen(false);
                        setSelectedCreditId(null);
                    }}
                    onCreate={handleUpdatePeriod}
                />
                </>
            )}


        
    </div>
)

}