export type PlanFrequency = 'month' | 'year';
export type SubscriptionStatus = 'active' | 'cancelled';

export interface BillingPlan {
    id: number;
    name: string;
    price_xof: number;
    frequency: PlanFrequency;
}

export interface BillingSubscription {
    id: number;
    status: SubscriptionStatus;
    billing_period: PlanFrequency;
    next_billing_at: string;
    plan: BillingPlan;
}

export interface BillingInvoice {
    id: number;
    amount: number;
    reference: string;
    billed_at: string;
}
