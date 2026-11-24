import { useGetGroupedExpenseQuery } from "@/state/api";
import Header from "./Header";



export default function GroupedExpenses(){
    const {data:groupedExpenses, isLoading, isError} = useGetGroupedExpenseQuery();

    if (isLoading) {
        return <div className="py-4">Cargando...</div>;
      }
    
      if (isError || !groupedExpenses) {
        return (
          <div className="text-center text-red-500 py-4">
            Fallo al buscar los Gastos
          </div>
        );
      }
    
      return (
     <div>
        <Header name="Gastos de este mes agrupados por Categoria"/>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 xl:overflow-auto gap-10 justify-between pb-4">
            
            {isLoading ? (
                <div>Cargando... </div>
            ) : (
                groupedExpenses?.map((expense, index) => (
                    <div key={index} className="border shadow rounded-md p-4 max-w-full w-full mx-auto">
                        <div className="flex flex-col items-center">
                            <h3 className="text-lg text-gray-900 font-semibold">{expense.category}</h3>
                            <div className="text-sm text-gray-600 mt-1">
                                Cantidad total Gastada: {expense._sum.amount}
                            </div>
                        </div>
                    </div>
                ))
            )}
            </div>
        </div>
        )
}
