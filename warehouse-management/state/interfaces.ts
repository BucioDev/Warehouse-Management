export interface SalesSummary {
    id: string;
    period: "WEEKLY" | "MONTHLY";
    startDate: string;
    endDate: string;
    totalValue: number;
    changePercentage?: number;
    createdAt: string;
}

export interface ExpenseSummary {
    id: string;
    period: "WEEKLY" | "MONTHLY";
    startDate: string;
    endDate: string;
    totalExpense: number;
    expenseByCategory: ExpenseByCategorySummary[];
    createdAt: string;
}

export interface ExpenseByCategorySummary {
    expenseByCategorySummaryId: string;
    expenseSummaryId:    string;
    category: string;
    amount: string;
}


export interface Product {
    id:     string;
    name:   string;
    price:  number;
    stock:  number;
}

export interface NewProduct {
    id:     string;
    name:   string;
    price:  number;
    stock:  number;
}


export interface Entry {
    id: string;
    productId: string;
    quantity: string;
    buyPrice: number;
    totalPrice: number;
    product: Product[];
    createdAt: string;
}
export interface NewEntry {
    productId: string;
    quantity: number;
    buyPrice: number;
}

export interface GroupedEntry {
    productId: string;
    _sum: {
        quantity: number | null;
        totalPrice: number | null;
    };
    _avg: {
        buyPrice: number | null;
    };
    _count: {
        id: number;
    };
    product: Product | null;
}

export interface Exit {
    id: string;
    productId: string;
    quantity: number;
    product: Product[];
    createdAt: string;
}
export interface NewExit {
    productId: string;
    quantity: number;
}

export interface GroupedExit {
    productId: string;
    _sum: {
        quantity: number | null;
    };
    _count: {
        id: number;
    };
    product: Product | null;
}

export interface Expense {
    id: string;
    category: string;
    amount: number;
    createdAt: string;
}
export interface NewExpense {
    category: string;
    amount: number;
}

export interface GroupedExpense {
    category:string;
    _sum: {
        amount: number | null;
    };
    _count: {
        id: number;
    };
}


export interface Sale {
    id: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    product: Product[];
    createdAt: string;
}
export interface NewSale {
    productId: string;
    quantity: number;
    unitPrice: number;
}

export interface GroupedSale {
    productId: string;
    _sum: {
        quantity: number | null;
        totalAmount: number | null;
    };
    _avg: {
        unitPrice: number | null;
    };
    _count: {
        id: number;
    };
    product: Product | null;
}



export interface Credits {
    id:             string;
    name:           string;
    totalDebt:      number;
    debtPaid:       number;
    remainingDebt:  number;
    periods:        number;
    Installments: Installments[]
}

export interface Installments {
    id:         string;
    creditId:   string;
    amount:     number;
    createdAt:  string;
}

export interface NewCredit {
    name:           string;
    totalDebt:      number;
    periods:        number;
}

export interface NewInstallment {
    creditId:   string;
    amount:     number;
}

export interface UpdateCreditPeriods {
    id:           string;
    newPeriod:      number;
}

export interface UpdateCreditDebt {
    id:         string;
    newDebt:    number;
}

