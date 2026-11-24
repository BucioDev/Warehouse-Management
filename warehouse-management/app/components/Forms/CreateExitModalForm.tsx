import { ChangeEvent, FormEvent, useState } from "react";
import { useGetProductsQuery } from "@/state/api";
import Header from "../Header";


type ExitFormData = {
    productId: string;
    quantity: number;
}

type CreateExitProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (FormData: ExitFormData) => void;
}

export default function CreateExitModalForm({isOpen, onClose, onCreate}: CreateExitProps){
    const { data: products, isError, isLoading } = useGetProductsQuery();
    const [formData, setFormData] = useState({
        productId:"",
        quantity: 0,
        buyPrice: 0,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:
            name === "quantity" ? parseFloat(value) : value,
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    }
    
    const labelCssStyles = "block text-sm font-medium text-gray-700";
    const inputCssStyles = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
    if(!isOpen) return null;

    return(
        <div className="fixed inset-0 bg-gray-600/50 overflow-y-auto h-ful w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Agregar nueva entrada"/>
                <form onSubmit={handleSubmit} className="mt-5">
                    <label htmlFor="productId" className={labelCssStyles}>
                        Selecione el producto a Recibir
                    </label>
                    <select name="productId" onChange={handleChange} value={formData.productId} className={inputCssStyles} required>
                    <option value="" disabled>Seleccione un producto</option>
                    {products?.map((p) => (
                        <option value={p.id} key={p.id}>{p.name}</option>
                    ))}
                </select>
    
                    <label htmlFor="quantity" className={labelCssStyles}>
                        Cantidad de producto Recibido (Cajas)
                    </label>
                    <input type="number" name="quantity" placeholder="" className={inputCssStyles}
                    onChange={handleChange} value={formData.quantity} required/>
    
                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        Crear Salida
                    </button>
                    <button type="button" className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={onClose}>
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    )
}