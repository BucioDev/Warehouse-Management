"use client"
import AddPaymentModalForm from "@/app/components/Forms/AddPaymentModalForm";
import Header from "@/app/components/Header";
import { useCreateInstallmentMutation, useGetCreditsQuery, useGetInstallmentsQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";

const columns: GridColDef[] = [
    {
        field: "amount",
        headerName: "Cantidad Pagada",
        width: 150,
      },
      {
        field: "createdAt",
        headerName: "Fecha del pago",
        width: 200,
        valueFormatter: (value) => {
            return new Date(value).toLocaleDateString("es-MX", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        },
    },
]

type InstallmentFormData = {
    creditId: string;
    amount: number;
}

interface installmentPageProps {
        id:string
}

export default function InstallmentsPage({id}:installmentPageProps){
    const {data:credits, isLoading, isError} = useGetCreditsQuery(id);
    const {data:installments} = useGetInstallmentsQuery(id);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [addPayment] = useCreateInstallmentMutation();

    const handleCreatePayment = async (installmentData: InstallmentFormData) => {
        await addPayment(installmentData);
    };


    if(isLoading) {
        return <div className="py-4">Cargando...</div>
    }
    if(isError || !credits) {
    return <div className="texts-center text-red-500 py-4">
        Fallo al cargar los Credito
    </div>
    }
    
    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <Header name="Pagos de credito"/>
                <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
                onClick={() => setIsModalOpen(true)}>
                    <PlusCircleIcon className="h-5 w-5 mr-2 text-gray-200!"/> Agregar Pago
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
            credits?.map((credit) => (
            <div
              key={credit.id}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-gray-900 font-semibold">
                  {credit.name}
                </h3>
                <h3 className="text-lg text-gray-900 font-semibold">
                Credito Total: {credit.totalDebt.toFixed(2)}
                </h3>
                <h3 className="text-lg text-green-500 font-semibold">
                Deauda pagada: {credit.debtPaid.toFixed(2)}
                </h3>
                <h3 className="text-lg text-red-500 font-semibold">
                Deauda Pendiente: {credit.remainingDebt.toFixed(2)}
                </h3>
                <h3 className="text-lg text-gray-900 font-semibold">
                  Periodo entre pagos: {credit.periods}
                </h3>
              </div>
            </div>
          ))
        )}
      </div>
    
            
            <DataGrid
                rows={installments}
                columns={columns}
                getRowId={(row) => row.id}
                className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
            />



                    <AddPaymentModalForm
                        creditId={id}
                        isOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                        }}
                        onCreate={handleCreatePayment}
                    />

            
        </div>
    )
    
}