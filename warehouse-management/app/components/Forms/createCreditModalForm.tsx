import { ChangeEvent, FormEvent, useState } from "react";
import Header from "../Header";

type creditFormData = {
    name: string;
    totalDebt: number;
    periods: number;
}

type CreateCreditProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (FormData: creditFormData) => void;
}

export default function CreateCreditModalForm({isOpen, onClose, onCreate}:CreateCreditProps){
const [formData, setFormData] = useState({
    name:"",
    totalDebt:0,
    periods:0
});

const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]:
        name === "totalDebt" || name === "periods" ? parseFloat(value) : value,
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
            <Header name="Agregar nuevo Credito"/>
            <form onSubmit={handleSubmit} className="mt-5">
                <label htmlFor="name" className={labelCssStyles}>
                    Nombre del cliente al que se le hace el credito
                </label>
                <input type="text" name="name" placeholder="" className={inputCssStyles}
                onChange={handleChange} value={formData.name} required/>

                <label htmlFor="totalDebt" className={labelCssStyles}>
                    Cantidad total del credito
                </label>
                <input type="number" name="totalDebt" placeholder="" className={inputCssStyles}
                onChange={handleChange} value={formData.totalDebt} required/>

                <label htmlFor="periods" className={labelCssStyles}>
                    Periodo entre pagos
                </label>
                <input type="number" name="periods" placeholder="" className={inputCssStyles}
                onChange={handleChange} value={formData.periods} required/>

                <button type="submit" className="mt-4 text-lg px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Agregar Credito
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