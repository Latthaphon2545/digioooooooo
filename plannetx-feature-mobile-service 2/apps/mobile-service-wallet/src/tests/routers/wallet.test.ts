import { Request, Response, NextFunction } from 'express';
import walletController from '../../controllers/wallet.controller';
import { WalletStatus } from '@planetx/models';
import { ServiceError } from '../../helpers/error.helper';
import WalletError from '@planetx/constants/errors/wallet.error.json'

const wallets: any = [
  {
    id: 1,
    walletId: '1',
    userUid: '1',
    balance: 100,
    currency: 'THB',
    status: WalletStatus.ACTIVATED,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    walletId: '2',
    userUid: '1',
    balance: 200,
    currency: 'THB',
    status: WalletStatus.ACTIVATED,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    walletId: '3',
    userUid: '1',
    balance: 300,
    currency: 'THB',
    status: WalletStatus.ACTIVATED,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    walletId: '4',
    userUid: '1',
    balance: 0,
    currency: 'THB',
    status: WalletStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

describe('walletController.getWallet', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      json: jest.fn() as jest.Mock
    };
    next = jest.fn() as NextFunction;
  });

  it('should return wallet data when wallet is found', async () => {
    req.body = { userUid: '1', walletId: '1' };
    const wallet = wallets[0];
    await walletController.getWallet()(req as Request, res as Response, next);
    expect(res.json).toHaveBeenCalledWith({
      resCode: "0000",
      resDesc: "",
      data: wallet
    });
  });

  it('should throw an error when wallet is not found', async () => {
    req.body = { userUid: '1', walletId: '2' };
    await walletController.getWallet()(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledWith(expect.any(ServiceError));
    const error = (next as jest.Mock).mock.calls[0][0];
    expect(error.statusCode).toBe(WalletError.ERR_WALLET_NOT_FOUND.statusCode);
    expect(error.resCode).toBe(WalletError.ERR_WALLET_NOT_FOUND.resCode);
    expect(error.resDesc).toBe(WalletError.ERR_WALLET_NOT_FOUND.resDesc);
  });
});

describe('walletController.listWallet', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      json: jest.fn() as jest.Mock
    };
    next = jest.fn() as NextFunction;
  });

  it('should return empty array when wallets is not found', async () => {
    req.body = { userUid: '1' };
    const wallets: any = [];
    await walletController.listWallet()(req as Request, res as Response, next);
    expect(res.json).toHaveBeenCalledWith({
      resCode: "0000",
      resDesc: "",
      data: wallets
    });
  });

  it('should return wallets when wallets is found', async () => {
    req.body = { userUid: '1' };
    await walletController.listWallet()(req as Request, res as Response, next);
    expect(res.json).toHaveBeenCalledWith({
      resCode: "0000",
      resDesc: "",
      data: wallets
    });
  });
});

describe('walletController.withdrawWalletMoney', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      json: jest.fn() as jest.Mock
    };
    next = jest.fn() as NextFunction;
  });

  it('should withdraw money successfully', async () => {
    req.body = { userUid: '1', walletId: '1', balance: 50 };
    const wallet = wallets[0];
    expect(res.json).toHaveBeenCalledWith({
      resCode: '0000',
      resDesc: {
        en: 'Completed withdrawal of funds from the wallet',
        th: 'ทำการถอนเงินออกจากกระเป๋าเงินเสร็จสมบูรณ์'
      }
    });
  });

  it('should throw an error when wallet is not found', async () => {
    req.body = { userUid: '1', walletId: '2', balance: 50 };
    expect(next).toHaveBeenCalledWith(expect.any(ServiceError));
    const error = (next as jest.Mock).mock.calls[0][0];
    expect(error.statusCode).toBe(WalletError.ERR_WALLET_NOT_FOUND.statusCode);
    expect(error.resCode).toBe(WalletError.ERR_WALLET_NOT_FOUND.resCode);
    expect(error.resDesc).toBe(WalletError.ERR_WALLET_NOT_FOUND.resDesc);
  });

  it('should throw an error if balance is insufficient', async () => {
    req.body = { userUid: '1', walletId: '1', balance: 150 };
    const wallet = wallets[0];
    expect(next).toHaveBeenCalledWith(expect.any(ServiceError));
    const error = (next as jest.Mock).mock.calls[0][0];
    expect(error.statusCode).toBe(WalletError.ERR_WALLET_BALANCE_INSUFFICIENT.statusCode);
    expect(error.resCode).toBe(WalletError.ERR_WALLET_BALANCE_INSUFFICIENT.resCode);
    expect(error.resDesc).toBe(WalletError.ERR_WALLET_BALANCE_INSUFFICIENT.resDesc);
  });

  it('should throw an error if balance is negative', async () => {
    req.body = { userUid: '1', walletId: '1', balance: -50 };
    expect(next).toHaveBeenCalledWith(expect.any(ServiceError));
    const error = (next as jest.Mock).mock.calls[0][0];
    expect(error.statusCode).toBe(WalletError.ERR_BALANCE_NEGATIVE.statusCode);
    expect(error.resCode).toBe(WalletError.ERR_BALANCE_NEGATIVE.resCode);
    expect(error.resDesc).toBe(WalletError.ERR_BALANCE_NEGATIVE.resDesc);
  });
});