import { useGetGroupedEntrysQuery } from "@/state/api"
import Header from "./Header";



export default function GroupedEntrys(){
    const {data:groupedEntrys, isLoading, isError} = useGetGroupedEntrysQuery();

    if (isLoading) {
        return <div className="py-4">Cargando...</div>;
      }
    
      if (isError || !groupedEntrys) {
        return (
          <div className="text-center text-red-500 py-4">
            Fallo al buscar Entradas
          </div>
        );
      }
    
      return (
     <div>
        <Header name="Entradas de este mes agrupadas por producto"/>
        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 xl:overflow-auto gap-10 justify-between pb-4">
            
            {isLoading ? (
                <div>Cargando... </div>
            ) : (
                groupedEntrys?.map((entry) => (
                    <div key={entry.productId }className="border shadow rounded-md p-4 bg-[#D8DBE2] max-w-full w-full mx-auto">
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl text-gray-900 font-bold">{entry.product?.name}</h3>
                            <p className="text-gray-800 text-lg font-medium">Precio Medio:{entry._avg.buyPrice}</p>
                            <div className="text-lg text-gray-800 font-medium mt-1">
                                Cantidad total Recibida: {entry._sum.quantity}
                            </div>
                            <div className="text-lg text-gray-800 font-medium mt-1">
                                Gasto total: {entry._sum.totalPrice}
                            </div>
                        </div>
                    </div>
                ))
            )}
            </div>
        </div>
        )
}
