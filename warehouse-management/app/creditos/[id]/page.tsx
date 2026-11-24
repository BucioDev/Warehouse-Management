
import InstallmentsPage from "@/app/components/pages/installmentsPage";

export default async function installmentsPageClient({params}:{params:Promise<{id:string}>}){
    const {id} = await params;
    return (
        <>
        <InstallmentsPage id={id}/>
        </>
    )
}