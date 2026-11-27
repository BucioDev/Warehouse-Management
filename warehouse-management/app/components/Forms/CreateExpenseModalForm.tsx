import { ChangeEvent, FormEvent, useState } from "react";
import { useGetProductsQuery } from "@/state/api";
import Header from "../Header";


type ExpenseFormData = {
    category: string;
    amount: number;
}

type CreateExpenseProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (FormData: ExpenseFormData) => void;
}

export default function CreateExpenseModalForm({isOpen, onClose, onCreate}: CreateExpenseProps){
    const [formData, setFormData] = useState({
        category: "",
        amount: 0,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:
            name === "amount" ? parseFloat(value) : value,
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
                <Header name="Agregar nueva entrada"/>
                <form onSubmit={handleSubmit} className="mt-5">
                    
                <label htmlFor="category" className={labelCssStyles}>
                        Categoria del gasto
                    </label>
                    <input type="text" name="category" placeholder="renta, sueldo de trabajadores" className={inputCssStyles}
                    onChange={handleChange} value={formData.category} required/>
    
                    <label htmlFor="amount" className={labelCssStyles}>
                        Cantidad del gasto
                    </label>
                    <input type="number" name="amount" placeholder="" className={inputCssStyles}
                    onChange={handleChange} value={formData.amount} required/>
    
                    <button type="submit" className="mt-4 text-lg px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        Crear Gasto
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