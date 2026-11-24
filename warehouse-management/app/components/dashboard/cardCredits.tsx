import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetDashboardMetricsQuery } from "@/state/api"

function getNextPayment(createdAt: string | Date, periods: number) {
    const lastPayment = new Date(createdAt);
    const nextPayment = new Date(lastPayment);

    nextPayment.setDate(nextPayment.getDate() + periods);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    nextPayment.setHours(0, 0, 0, 0);

    const daysDifference = Math.round(
        (nextPayment.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDifference > 1) return `En ${daysDifference} días`;
    if (daysDifference === 1) return "En 1 día";
    if (daysDifference === 0) return "Vence hoy";
    if (daysDifference === -1) return "1 día de atraso";

    return `${Math.abs(daysDifference)} días de atraso`;
}



export default function CardCredits() {
    const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

    return (
        <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
            {isLoading ? (
                <div className="mt-5">Cargando ...</div>
            ) : (
                <>
                    <h3 className="text-lg font-semibold px-7 pt-5 pb-2">Creditos</h3>
                    <hr />
                    <div className="overflow-auto h-full">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Deuda pendiente</TableHead>
                                    <TableHead>Próximo pago</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dashboardMetrics?.credits.map((c) => {
                                    const lastInstallment = c.Installments?.[0];

                                    return (
                                        <TableRow key={c.id}>
                                            <TableCell>{c.name}</TableCell>
                                            <TableCell className="font-semibold text-red-500">
                                                ${c.remainingDebt}
                                            </TableCell>
                                            <TableCell className="font-semibold">
                                                {lastInstallment
                                                    ? getNextPayment(lastInstallment.createdAt, c.periods)
                                                    : "Sin pagos"}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}
        </div>
    );
}