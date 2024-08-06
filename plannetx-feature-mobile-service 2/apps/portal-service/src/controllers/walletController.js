const portalTypeMaster = require("../constants/masters/portalTypeMaster.json");
const walletStatusMaster = require("../constants/masters/walletStatusMaster.json");

const luhn = require("../helpers/luhn");

const walletModel = require("../models/walletModel");

exports.createWallet = (walletType) => (req, res, next) => {
  const user = req.user;
  const t = req.t;
  const inuser = req.inuser;

  const { "x-partner-id": partnerId } = req.headers;

  const walletId = `${process.env.WALLET_PREFIX}${String(
    user.portalTypeId === portalTypeMaster.DIGIO.id ? partnerId : user.partnerId
  )
    .padStart(2, "0")
    .substring(0, 2)}XXXXXXXXX`;

  walletModel
    .create(
      {
        partnerId:
          user.portalTypeId === portalTypeMaster.DIGIO.id
            ? partnerId
            : user.partnerId,
        walletTypeId: walletType.id,
        walletId,
        userId: inuser.id,
        isDefault: true,
        status: walletStatusMaster.ACTIVATED,
      },
      { transaction: t }
    )
    .then((wallet) => {
      const newWalletId = walletId.replace(
        "XXXXXXXXX",
        String(wallet.id).padStart(9, "0")
      );
      const newWalletWithCheckSum = newWalletId + luhn.nextDigit(newWalletId);

      req.wallet = {
        ...wallet.toJSON(),
        walletId: newWalletWithCheckSum,
      };
      return wallet.update(
        { walletId: newWalletWithCheckSum },
        { transaction: t }
      );
    })
    .then(() => next())
    .catch((err) => next(err));
};
