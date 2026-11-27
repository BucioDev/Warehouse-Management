import { ChangeEvent, FormEvent, useState } from "react";
import Header from "../Header";

type productFormData = {
    id: string;
    name: string;
    price: number;
    stock: number;
}

type CreateProductProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (FormData: productFormData) => void;
}

export default function CreateProductModalForm({isOpen, onClose, onCreate}:CreateProductProps){
const [formData, setFormData] = useState({
    id:"",
    name:"",
    price:0,
    stock:0
});

const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]:
        name === "price" || name === "stock" ? parseFloat(value) : value,
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
            <Header name="Crear nuevo producto"/>
            <form onSubmit={handleSubmit} className="mt-5">
                <label htmlFor="id" className={labelCssStyles}>
                    Codigo del producto
                </label>
                <input type="text" name="id" placeholder="" className={inputCssStyles}
                onChange={handleChange} value={formData.id} required/>

                <label htmlFor="name" className={labelCssStyles}>
                    Nombre del producto
                </label>
                <input type="text" name="name" placeholder="Nombre" className={inputCssStyles}
                onChange={handleChange} value={formData.name} required/>

                <label htmlFor="price" className={labelCssStyles}>
                    Precio del producto
                </label>
                <input type="number" name="price" placeholder="" className={inputCssStyles}
                onChange={handleChange} value={formData.price} required/>

                <label htmlFor="stock" className={labelCssStyles}>
                    Stock del producto
                </label>
                <input type="number" name="stock" placeholder="" className={inputCssStyles}
                onChange={handleChange} value={formData.stock} required/>

                <button type="submit" className="mt-4 text-lg px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Crear producto
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