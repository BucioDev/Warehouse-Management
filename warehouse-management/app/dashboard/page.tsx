"use client"

import CardCredits from "../components/dashboard/cardCredits"
import CardExpensesSummary from "../components/dashboard/cardExpensesSummary"
import CardSalesSummary from "../components/dashboard/cardSaleSummary"

export default function DashboardPage(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardCredits/>
      <CardSalesSummary/>
      <CardExpensesSummary/>
      <div className="row-span-3 bg-gray-500"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500"></div>
    </div>
  )
};

