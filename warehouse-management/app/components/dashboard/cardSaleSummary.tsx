
import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type SummaryPeriod = "WEEKLY" | "MONTHLY";

export default function CardSalesSummary() {
    const { data, isLoading, isError } = useGetDashboardMetricsQuery();
    const [period, setPeriod] = useState<SummaryPeriod>("MONTHLY");

    const salesData = (data?.salesSummary || [])
        .filter((summary) => summary.period === period)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    const totalValueSum = salesData.reduce(
        (acc, curr) => acc + Number(curr.totalValue), 0
    );

    const highestValueData = salesData.reduce(
        (acc, curr) => Number(curr.totalValue) > Number(acc?.totalValue ?? 0) ? curr : acc,
        salesData[0]
    );

    const latestSummary = salesData[salesData.length - 1];
    const changePercentage = latestSummary?.changePercentage;

    const highestValueDate = highestValueData
        ? new Date(highestValueData.startDate).toLocaleDateString("es-MX", {
            timeZone: "America/Tijuana",
            year: "numeric",
            month: "short",
            day: "numeric",
        })
        : "N/A";

    if (isError) {
        return <div className="m-5">Fallo al buscar la informacion</div>;
    }

    return (
        <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
            {isLoading ? (
                <div className="m-5">Cargando...</div>
            ) : (
                <>
                    {/* HEADER */}
                    <div>
                        <div className="flex justify-between items-center px-7 pt-5 mb-2">
                            <h2 className="text-lg font-semibold">
                                Resumen de Ventas
                            </h2>
                            <select
                                className="shadow-sm border border-gray-300 bg-white p-2 rounded text-sm"
                                value={period}
                                onChange={(e) => setPeriod(e.target.value as SummaryPeriod)}
                            >
                                <option value="WEEKLY">Semanal</option>
                                <option value="MONTHLY">Mensual</option>
                            </select>
                        </div>
                        <hr />
                    </div>

                    {/* BODY */}
                    <div>
                        <div className="flex justify-between items-center mb-6 px-7 mt-5">
                            <div className="text-lg font-medium">
                                <p className="text-xs text-gray-400">Valor acumulado</p>
                                <span className="text-2xl font-extrabold">
                                    ${totalValueSum.toLocaleString("es-MX", {
                                        maximumFractionDigits: 2,
                                    })}
                                </span>

                                {changePercentage !== null && changePercentage !== undefined && (
                                    <span className={`text-sm ml-2 ${
                                        changePercentage >= 0 ? "text-green-500" : "text-red-500"
                                    }`}>
                                        {changePercentage >= 0 ? (
                                            <TrendingUp className="inline w-4 h-4 mr-1" />
                                        ) : (
                                            <TrendingDown className="inline w-4 h-4 mr-1" />
                                        )}
                                        {changePercentage.toFixed(2)}%
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* CHART */}
                        {salesData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={350} className="px-7">
                                <BarChart
                                    data={salesData}
                                    margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                                >
                                    <CartesianGrid strokeDasharray="" vertical={false} />
                                    <XAxis
                                        dataKey="startDate"
                                        tickFormatter={(value) => {
                                            const date = new Date(value);
                                            return period === "WEEKLY"
                                                ? date.toLocaleDateString("es-MX", {
                                                    month: "numeric",
                                                    day: "numeric",
                                                    timeZone: "America/Tijuana",
                                                })
                                                : date.toLocaleDateString("es-MX", {
                                                    month: "short",
                                                    year: "2-digit",
                                                    timeZone: "America/Tijuana",
                                                });
                                        }}
                                    />
                                    <YAxis
                                        tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}m`}
                                        tick={{ fontSize: 12, dx: -1 }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        formatter={(value: any) => [
                                            `$${Number(value).toLocaleString("es-MX")}`,
                                            "Ventas",
                                        ]}
                                        labelFormatter={(label: any) => {
                                            const date = new Date(label);
                                            return date.toLocaleDateString("es-MX", {
                                                timeZone: "America/Tijuana",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            });
                                        }}
                                    />
                                    <Bar
                                        dataKey="totalValue"
                                        fill="#3182ce"
                                        barSize={20}
                                        radius={[10, 10, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-[350px] flex items-center justify-center text-sm text-gray-500">
                                No hay resúmenes disponibles.
                            </div>
                        )}
                    </div>

                    {/* FOOTER */}
                    <div>
                        <hr />
                        <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
                            <p>{salesData.length} {period === "WEEKLY" ? "semanas" : "meses"}</p>
                            <p>
                                Mayor venta:{" "}
                                <span className="font-bold">{highestValueDate}</span>
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
