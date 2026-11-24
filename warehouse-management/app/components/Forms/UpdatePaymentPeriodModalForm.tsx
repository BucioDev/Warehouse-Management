import { ChangeEvent, FormEvent, useState } from "react";
import Header from "../Header";

type periodFormData = {
    id: string;
    newPeriod: number;
}

type UpdatePaymentPeriodProps = {
    creditId:string;
    isOpen: boolean;
    onClose: () => void;
    onCreate: (FormData: periodFormData) => void;
}

export default function UpdatePaymentPeriodModalForm({creditId, isOpen, onClose, onCreate}:UpdatePaymentPeriodProps){
const [formData, setFormData] = useState({
    id:creditId,
    newPeriod:0,
});

const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]:
        name === "newPeriod"  ? parseFloat(value) : value,
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
            <Header name="Agregar nuevo Pago"/>
            <form onSubmit={handleSubmit} className="mt-5">

                <label htmlFor="newPeriod" className={labelCssStyles}>
                    Nuevo periodo entre pagos
                </label>
                <input type="number" name="newPeriod" placeholder="" className={inputCssStyles}
                onChange={handleChange} value={formData.newPeriod} required/>

                <input type="hidden" name="creditId" value={creditId}/>

                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Actulizar periodo
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