export enum WalletStatus {
  PENDING = 'PENDING',
  ACTIVATED = 'ACTIVATED',
  REDEEMED = 'REDEEMED',
  SUSPENDED = 'SUSPENDED'
}

export interface Wallet{
  id: string;
  ownerId: string;
  ownerName?: string;
  currency: string;
  balance: string;
  status: keyof typeof WalletStatus;
  createdAt: string;
  activatedAt?: string;
  redeemedAt?: string;
  suspendedAt?: string;
  updatedAt: string;
}
