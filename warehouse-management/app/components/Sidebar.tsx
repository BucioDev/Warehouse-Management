"use client"
import { Archive, Clipboard, Layout, LucideIcon, Menu, Package, Ticket, Truck, Wallet } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux";
import { setIsSidebarCollapsed } from "@/state";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label:string;
    isCollapsed: boolean;
}

const SidebarLink = ({
    href,
    icon:Icon,
    label,
    isCollapsed
}: SidebarLinkProps) => {
    const path = usePathname();
    const isActive = path === href || (path === "/" && href === "/dashboard");

    return (
        <Link href={href}>
            <div className={`cursor-pointer flex items-center ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"}
            hover:text-blue-500 hover:bg-blue-300 gap-3 transition-colors ${isActive ? "bg-blue-300 text-white" : ""}`}>
                <Icon className="w-6 h-6 text-gray-700!"/>
                <span className={`${isCollapsed ? "hidden" : "block"} text-lg font-medium text-gray-900`}> {label}</span>
            </div>
        </Link>
    )
}
 
export default function Sidebar(){


    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

    const toogleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    };

    const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} bg-[#D8DBE2] transition-all duration-300
    overflow-hidden h-full shadow-md z-40`;


    return (
        <div className={sidebarClassNames}>
            <div className={`flex flex-col gap-3 items-center pt-8 ${isSidebarCollapsed ? "px-5" : "px-8"}`}>
                <Image src="https://s3-warehouse-management-607063196079-us-east-2-an.s3.us-east-2.amazonaws.com/fruseva+logo.jpeg"
                    alt="logo" width={500} height={500} loading="eager"
                    className={`${isSidebarCollapsed ? "hidden" : "w-[90%]"} h-auto object-contain`}/>

                <h1 className={`${isSidebarCollapsed ? "hidden" : "block"} font-extrabold text-2xl`}>
                    🌱 Fruseva 🍌
                </h1>

                <button
                    className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
                    onClick={toogleSidebar}>
                    <Menu className="w-4 h-4"/>
                </button>
            </div>

            <div className="grow mt-8">
                <SidebarLink href="/dashboard" icon={Layout} 
                label="Inicio" isCollapsed={isSidebarCollapsed}/>

                <SidebarLink href="/inventory" icon={Archive} 
                label="Inventario" isCollapsed={isSidebarCollapsed}/>

                <SidebarLink href="/entradas" icon={Package} 
                label="Entradas" isCollapsed={isSidebarCollapsed}/>

                <SidebarLink href="/salidas" icon={Truck} 
                label="Salidas" isCollapsed={isSidebarCollapsed}/>

                <SidebarLink href="/ventas" icon={Clipboard} 
                label="Ventas" isCollapsed={isSidebarCollapsed}/>

                <SidebarLink href="/gastos" icon={Ticket} 
                label="Gastos" isCollapsed={isSidebarCollapsed}/>

                <SidebarLink href="/creditos" icon={Wallet} 
                label="Creditos" isCollapsed={isSidebarCollapsed}/>
            </div>

            <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
                <p className="text-center text-sm text-gray-500">&copy; 2026 Fruseva </p>
            </div>
        </div>
    )
}