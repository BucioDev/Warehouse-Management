import { useGetGroupedExitsQuery } from "@/state/api";
import Header from "./Header";



export default function GroupedExits(){
    const {data:groupedExits, isLoading, isError} = useGetGroupedExitsQuery();

    if (isLoading) {
        return <div className="py-4">Cargando...</div>;
      }
    
      if (isError || !groupedExits) {
        return (
          <div className="text-center text-red-500 py-4">
            Fallo al buscar Salidas
          </div>
        );
      }
    
      return (
     <div>
        <Header name="Salidas de este mes agrupadas por producto"/>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 xl:overflow-auto gap-10 justify-between pb-4">
            
            {isLoading ? (
                <div>Cargando... </div>
            ) : (
                groupedExits?.map((exit) => (
                    <div key={exit.productId }className="border shadow bg-[#D8DBE2] rounded-md p-4 max-w-full w-full mx-auto">
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl text-gray-900 font-bold">{exit.product?.name}</h3>
                            <div className="text-lg text-gray-800 font-medium mt-1">
                                Cantidad total Recibida: {exit._sum.quantity}
                            </div>
                        </div>
                    </div>
                ))
            )}
            </div>
        </div>
        )
}
