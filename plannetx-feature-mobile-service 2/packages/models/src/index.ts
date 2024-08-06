import { MasterBankModel } from './models/masterBank'
import { UserModel } from './models/user'
import { UserBankModel } from './models/userBank'

UserBankModel.belongsTo(UserModel, { foreignKey: 'user_id' })
UserModel.hasMany(UserBankModel, { foreignKey: 'user_id', as: 'userBank' })

UserBankModel.belongsTo(MasterBankModel, { foreignKey: 'bank_id', as: 'bank' })
MasterBankModel.hasMany(UserBankModel, { foreignKey: 'bank_id' })

export * from './sequelize'
export * from './models/otp'
export * from './models/user'
export * from './models/version'
export * from './models/userToken'
export * from './models/userKey'
export * from './models/masterBank'
export * from './models/userBank'
export * from './models/runningNumber'
export * from './models/logBankIntegration'

export * from './types/wallet'
export * from './types/transaction'
