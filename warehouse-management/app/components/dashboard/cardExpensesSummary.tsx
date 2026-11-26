import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useState } from "react";

const colors = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042", "#8884D8"];

type SummaryPeriod = "WEEKLY" | "MONTHLY";

export default function CardExpensesSummary() {
    const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
    const [period, setPeriod] = useState<SummaryPeriod>("MONTHLY");

    const expenseSummary = dashboardMetrics?.expenseSummary?.find(
        (summary) => summary.period === period
    );

    const expenseCategories = (expenseSummary?.expenseByCategory || []).map(
        (item) => ({
            name: item.category,
            value: Number(item.amount),
        })
    );

    const totalExpenses = Number(expenseSummary?.totalExpense ?? 0);
    const formattedTotalExpenses = totalExpenses.toFixed(2);

    return (
        <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between">
            {isLoading ? (
                <div className="m-5">Loading...</div>
            ) : (
                <>
                    {/* HEADER */}
                    <div>
                        <div className="flex justify-between items-center px-7 pt-5 mb-2">
                            <h2 className="text-lg font-semibold">
                                Resumen de Gastos
                            </h2>
                            <select
                                value={period}
                                onChange={(e) => setPeriod(e.target.value as SummaryPeriod)}
                                className="text-sm border rounded-lg px-2 py-1"
                            >
                                <option value="WEEKLY">Semanal</option>
                                <option value="MONTHLY">Mensual</option>
                            </select>
                        </div>
                        <hr />
                    </div>

                    {/* BODY */}
                    {expenseSummary ? (
                        <>
                            <div className="xl:flex justify-between pr-7">
                                {/* CHART */}
                                <div className="relative basis-3/5">
                                    <ResponsiveContainer width="100%" height={140}>
                                        <PieChart>
                                            <Pie
                                                data={expenseCategories}
                                                innerRadius={50}
                                                outerRadius={60}
                                                dataKey="value"
                                                nameKey="name"
                                            >
                                                {expenseCategories.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={colors[index % colors.length]}
                                                    />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                        <span className="font-bold text-xl">
                                            ${formattedTotalExpenses}
                                        </span>
                                    </div>
                                </div>

                                {/* LABELS */}
                                <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
                                    {expenseCategories.map((entry, index) => (
                                        <li
                                            key={`legend-${index}`}
                                            className="flex items-center text-xs"
                                        >
                                            <span
                                                className="mr-2 w-3 h-3 rounded-full"
                                                style={{
                                                    backgroundColor: colors[index % colors.length],
                                                }}
                                            />
                                            {entry.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* FOOTER */}
                            <div>
                                <hr />
                                <div className="mt-3 flex justify-between items-center px-7 mb-4">
                                    <div className="pt-2">
                                        <p className="text-sm">
                                            Total:{" "}
                                            <span className="font-semibold">
                                                ${totalExpenses.toFixed(2)}
                                            </span>
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {new Date(expenseSummary.startDate).toLocaleDateString()} -
                                        {" "}
                                        {new Date(expenseSummary.endDate).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-1 items-center justify-center p-8 text-sm text-gray-500">
                            No hay resumen {period === "WEEKLY" ? "semanal" : "mensual"} disponible.
                        </div>
                    )}
                </>
            )}
        </div>
    );
}