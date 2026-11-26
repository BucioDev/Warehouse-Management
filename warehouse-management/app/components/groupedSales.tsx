import { useGetGroupedSalesQuery } from "@/state/api";
import Header from "./Header";



export default function GroupedSales(){
    const {data:groupedSales, isLoading, isError} = useGetGroupedSalesQuery();

    if (isLoading) {
        return <div className="py-4">Cargando...</div>;
      }
    
      if (isError || !groupedSales) {
        return (
          <div className="text-center text-red-500 py-4">
            Fallo al buscar Ventas
          </div>
        );
      }
    
      return (
     <div>
        <Header name="Ventas de este mes agrupadas por producto"/>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 xl:overflow-auto gap-10 justify-between pb-4">
            
            {isLoading ? (
                <div>Cargando... </div>
            ) : (
                groupedSales?.map((sale) => (
                    <div key={sale.productId }className="border shadow bg-[#D8DBE2] rounded-md p-4 max-w-full w-full mx-auto">
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl text-gray-900 font-bold">{sale.product?.name}</h3>
                            <p className="text-lg text-gray-800 font-medium">Precio Medio:{sale._avg.unitPrice}</p>
                            <div className="text-lg text-gray-800 font-medium mt-1">
                                Cantidad total Vendida: {sale._sum.quantity}
                            </div>
                            <div className="text-lg text-gray-800 font-medium mt-1">
                                Ganancia total: {sale._sum.totalAmount}
                            </div>
                        </div>
                    </div>
                ))
            )}
            </div>
        </div>
        )
}
