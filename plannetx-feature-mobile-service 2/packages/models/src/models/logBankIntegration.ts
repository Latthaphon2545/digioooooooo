import { Model, DataTypes, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize'

import { sequelize } from '../sequelize'

export enum LogBankIntegrationType {
  REQEUEST= 'REQUEST',
  RESPONSE= 'RESPONSE'
}

export class LogBankIntegrationModel extends Model<InferAttributes<LogBankIntegrationModel>, InferCreationAttributes<LogBankIntegrationModel>> {
  declare id: CreationOptional<number>
  declare requestId: String
  declare bank: String
  declare transactionReference:CreationOptional< String>
  declare type: LogBankIntegrationType
  declare action: CreationOptional<String>
  declare url: String
  declare header: String
  declare body: String
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

LogBankIntegrationModel.init({
  id: {
    field: 'id',
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  requestId: {
    field: 'request_id',
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  bank: {
    field: 'bank',
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  transactionReference: {
    field: 'transaction_reference',
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  type: {
    field: 'type',
    type: DataTypes.ENUM(),
    values: Object.values(LogBankIntegrationType),
    defaultValue: LogBankIntegrationType.REQEUEST,
    allowNull: false,
  },
  action: {
    field: 'action',
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  url: {
    field: 'url',
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  header: {
    field: 'header',
    type: DataTypes.TEXT(),
    allowNull: true,
  },
  body: {
    field: 'body',
    type: DataTypes.TEXT(),
    allowNull: true,
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
  tableName: 'dp_log_bank_integration'
})
