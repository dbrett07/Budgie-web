
export enum SyncStatus { 
    PENDING = "PENDING", 
    SUCCESS = "SUCCESS", 
    FAILED  = "FAILED"
}

export enum TransactionType { 
    NONE = "UNASSIGNED", 
    FOOD = "FOOD", 
    BILLS = "BILLS", 
    GROCERY = "GROCERY", 
    RENT = "RENT", 
}

export enum BudgetPeriodType { 
    DAY = "DAY",
    WEEK = "WEEK",
    MONTH = "MONTH",
    YEAR = "YEAR",
    CUSTOM = "CUSTOM"
}