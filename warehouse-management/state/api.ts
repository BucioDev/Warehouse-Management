import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { Credits, Entry, Exit, Expense, ExpenseByCategorySummary, ExpenseSummary, GroupedEntry, GroupedExit, GroupedExpense, GroupedSale, Installments, NewCredit, NewEntry, NewExit, NewExpense, NewInstallment, NewProduct, NewSale, Product, Sale, SalesSummary, UpdateCreditDebt, UpdateCreditPeriods } from "./interfaces";


export interface DashboardMetrics {
    salesSummary: SalesSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
    credits: Credits[];
}

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath:"api",
    tagTypes:["DashboardMetrics", "Products", "Entrys", "Exits", "Expenses", "sales", "Credits", "installments"],
    endpoints:(build) =>({
        getDashboardMetrics: build.query<DashboardMetrics, void>({
            query: () => "/dashboard",
            providesTags:["DashboardMetrics"]
        }),
        getProducts: build.query<Product[], string | void>({
            query: (search) => ({
                url:"/products",
                params:search ? { search } : {}
            }),
            providesTags:["Products"]
        }),
        createProduct: build.mutation<Product, NewProduct>({
            query: (NewProduct) => ({
                url:"/products",
                method:"POST",
                body: NewProduct
            }),
            invalidatesTags: ["Products"]
        }),
        getEntrys: build.query<Entry[], string | void>({
            query: () => ({
                url:"/entrys",
            }),
            providesTags:["Entrys"]
        }),
        getGroupedEntrys: build.query<GroupedEntry[], string | void>({
            query: () => ({
                url: "/entrys/grouped",
            }),
            providesTags: ["Entrys"],
        }),
        createEntry: build.mutation<Entry, NewEntry>({
            query: (NewEntry) => ({
                url:"/entrys",
                method:"POST",
                body: NewEntry
            }),
            invalidatesTags: ["Entrys", "Products"]
        }),

        getExits: build.query<Exit[], string | void>({
            query: () => ({
                url:"/exits",
            }),
            providesTags:["Exits"]
        }),
        getGroupedExits: build.query<GroupedExit[], string | void>({
            query: () => ({
                url: "/exits/grouped",
            }),
            providesTags: ["Exits"],
        }),
        createExit: build.mutation<Exit, NewExit>({
            query: (NewEntry) => ({
                url:"/exits",
                method:"POST",
                body: NewEntry
            }),
            invalidatesTags: ["Exits", "Products"]
        }),

        getExpenses: build.query<Expense[], string | void>({
            query: () => ({
                url:"/expenses",
            }),
            providesTags:["Expenses"]
        }),
        getGroupedExpense: build.query<GroupedExpense[], string | void>({
            query: () => ({
                url: "/expenses/grouped",
            }),
            providesTags: ["Expenses"],
        }),
        createExpense: build.mutation<Expense, NewExpense>({
            query: (NewExpense) => ({
                url:"/expenses",
                method:"POST",
                body: NewExpense
            }),
            invalidatesTags: ["Expenses"]
        }),

        getSales: build.query<Sale[], string | void>({
            query: () => ({
                url:"/sales",
            }),
            providesTags:["sales"]
        }),
        getGroupedSales: build.query<GroupedSale[], string | void>({
            query: () => ({
                url: "/sales/grouped",
            }),
            providesTags: ["sales"],
        }),
        createSale: build.mutation<Sale, NewSale>({
            query: (NewSale) => ({
                url:"/sales",
                method:"POST",
                body: NewSale
            }),
            invalidatesTags: ["sales"]
        }),

        getCredits: build.query<Credits[], string | void>({
            query: (search) => ({
                url:"/credits",
                params:search ? { search } : {}
            }),
            providesTags:["Credits"]
        }),
        createCredit: build.mutation<Credits, NewCredit>({
            query: (NewCredit) => ({
                url:"/credits",
                method:"POST",
                body: NewCredit
            }),
            invalidatesTags: ["Credits"]
        }),
        updateCreditDebt: build.mutation<Credits, UpdateCreditDebt>({
            query: (UpdateCreditDebt) => ({
                url:"/credits/add-debt",
                method:"POST",
                body: UpdateCreditDebt
            }),
            invalidatesTags: ["Credits","DashboardMetrics"]
        }),
        updateCreditPeriod: build.mutation<Credits, UpdateCreditPeriods>({
            query: (UpdateCreditPeriods) => ({
                url:"/credits/change-period",
                method:"POST",
                body: UpdateCreditPeriods
            }),
            invalidatesTags: ["Credits","DashboardMetrics"]
        }),

        getInstallments: build.query<Installments[], string | void>({
            query: (search) => ({
                url:"/installments",
                params:search ? { search } : {}
            }),
            providesTags:["installments"]
        }),
        createInstallment: build.mutation<Installments, NewInstallment>({
            query: (NewInstallment) => ({
                url:"/installments",
                method:"POST",
                body: NewInstallment
            }),
            invalidatesTags: ["installments","Credits","DashboardMetrics"]
        }),




        
    }),
});

export const { useGetDashboardMetricsQuery,
    useGetProductsQuery, useCreateProductMutation, 
    useGetEntrysQuery, useCreateEntryMutation, useGetGroupedEntrysQuery,
    useGetExitsQuery, useCreateExitMutation, useGetGroupedExitsQuery,
    useGetExpensesQuery, useCreateExpenseMutation, useGetGroupedExpenseQuery,
    useGetSalesQuery, useCreateSaleMutation, useGetGroupedSalesQuery,
    useGetCreditsQuery, useCreateCreditMutation, useUpdateCreditDebtMutation, useUpdateCreditPeriodMutation,
    useGetInstallmentsQuery, useCreateInstallmentMutation} = api;