export enum TransactionType {
  TOP_UP='TOP_UP',
  TRANSFER='TRANSFER',
  REDEMPTION='REDEMPTION',
  WITHDRAWAL='WITHDRAWAL',
  ADJUSTMENT='ADJUSTMENT'
}

export enum AbsorbType {
  PAYER='PAYER',
  PAYEE='PAYEE',
}

export enum TransactionStatus {
  PENDING='PENDING',
  APPROVED='APPROVED',
  FAILED='FAILED'
}

export interface Transaction{
  id: string;
  orderId: string;
  type: keyof typeof TransactionType;
  payerWalletId: string;
  payeeWalletId: string;
  feeAbsorbBy?: keyof typeof AbsorbType;
  feeWalletId?: string;
  origCurrency?: string;
  origAmount?: number;
  currency: string;
  amount: number;
  fee?: string;
  status?: keyof typeof TransactionStatus;
  reference1?: string;
  reference2?: string;
  failureCause?: string;
  createdAt?: Date;
  approvedAt?: Date;
  failedAt?: Date;
  updatedAt?: Date;
}
