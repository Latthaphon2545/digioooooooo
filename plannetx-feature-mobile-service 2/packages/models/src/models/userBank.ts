import { Model, DataTypes, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize'

import { sequelize } from '../sequelize'

import { UserModel } from './user'
import { MasterBankModel } from './masterBank'

export class UserBankModel extends Model<InferAttributes<UserBankModel>, InferCreationAttributes<UserBankModel>> {
  declare id: CreationOptional<number>
  declare userId: number
  declare bankId: number
  declare bankAccountNumber: string
  declare bankAccountName: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

UserBankModel.init({
  id: {
    field: 'id',
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  userId: {
    field: 'user_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: 'id'
    }
  },
  bankId: {
    field: 'bank_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MasterBankModel,
      key: 'id'
    }
  },
  bankAccountNumber: {
    field: 'bank_account_number',
    type: DataTypes.STRING,
    allowNull: false,
  },
  bankAccountName: {
    field: 'bank_account_name',
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
  }
}, {
  sequelize,
  tableName: 'dp_user_bank'
})
