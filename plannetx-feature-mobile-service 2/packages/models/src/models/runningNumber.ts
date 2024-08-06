import { Model, DataTypes, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize'

import { sequelize } from '../sequelize'

export enum RunningNumberType {
  WALLET= 'WALLET'
}

export class RunningNumberModel extends Model<InferAttributes<RunningNumberModel>, InferCreationAttributes<RunningNumberModel>> {
  declare id: CreationOptional<number>
  declare type: RunningNumberType
  declare number: number
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

RunningNumberModel.init({
  id: {
    field: 'id',
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  type: {
    field: 'type',
    type: DataTypes.ENUM(),
    values: Object.values(RunningNumberType),
    defaultValue: RunningNumberType.WALLET,
    allowNull: false,
  },
  number: {
    field: 'number',
    type: DataTypes.INTEGER,
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
  tableName: 'dp_running_number'
})
