import { ChangeEvent, FormEvent, useState } from "react";
import { useGetProductsQuery } from "@/state/api";
import Header from "../Header";


type SaleFormData = {
    productId: string;
    quantity: number;
    unitPrice: number;
}

type CreateSaleProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (FormData: SaleFormData) => void;
}

export default function CreateSaleModalForm({isOpen, onClose, onCreate}: CreateSaleProps){
    const { data: products, isError, isLoading } = useGetProductsQuery();
    const [formData, setFormData] = useState({
        productId:"",
        quantity: 0,
        unitPrice: 0,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:
            name === "quantity" || name === "unitPrice" ? parseFloat(value) : value,
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    }
    
    const labelCssStyles = "block text-lg font-medium text-gray-700";
    const inputCssStyles = "block text-lg w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
    if(!isOpen) return null;

    return(
        <div className="fixed inset-0 bg-gray-600/50 overflow-y-auto h-ful w-full z-20">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <Header name="Agregar nueva Venta"/>
                <form onSubmit={handleSubmit} className="mt-5">
                    <label htmlFor="productId" className={labelCssStyles}>
                        Selecione el producto a Vender o Vendido
                    </label>
                    <select name="productId" onChange={handleChange} value={formData.productId} className={inputCssStyles} required>
                    <option value="" disabled>Seleccione un producto</option>
                    {products?.map((p) => (
                        <option value={p.id} key={p.id}>{p.name}</option>
                    ))}
                </select>
    
                    <label htmlFor="quantity" className={labelCssStyles}>
                        Cantidad de producto Vendido
                    </label>
                    <input type="number" name="quantity" placeholder="" className={inputCssStyles}
                    onChange={handleChange} value={formData.quantity} required/>
    
                    <label htmlFor="unitPrice" className={labelCssStyles}>
                        Precio al que se compro el producto
                    </label>
                    <input type="number" name="unitPrice" placeholder="" className={inputCssStyles}
                    onChange={handleChange} value={formData.unitPrice} required/>
    
                    <button type="submit" className="mt-4 text-lg px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        Crear Venta
                    </button>
                    <button type="button" className="ml-2 text-lg px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={onClose}>
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    )
}