import { Model, DataTypes, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize'

import { sequelize } from '../sequelize'

export class OTPModel extends Model<InferAttributes<OTPModel>, InferCreationAttributes<OTPModel>> {
  declare id: CreationOptional<number>
  declare phoneNo: string
  declare otp: string
  declare reference: string
  declare isPass: CreationOptional<boolean>
  declare attempt: CreationOptional<number>
  declare expiredAt: String
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

OTPModel.init({
  id: {
    field: 'id',
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  phoneNo: {
    field: 'phone_no',
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  otp: {
    field: 'otp',
    type: DataTypes.STRING,
    allowNull: false,
  },
  reference: {
    field: 'reference',
    type: DataTypes.STRING,
    allowNull: false,
  },
  isPass: {
    field: 'is_pass',
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  attempt: {
    field: 'attempt',
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  expiredAt: {
    field: 'expired_at',
    type: DataTypes.DATE,
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
  tableName: 'dp_otp'
})
