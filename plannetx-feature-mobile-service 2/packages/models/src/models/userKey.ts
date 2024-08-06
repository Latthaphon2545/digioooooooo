import { Model, DataTypes, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize'

import { sequelize } from '../sequelize'

export class UserKeyModel extends Model<InferAttributes<UserKeyModel>, InferCreationAttributes<UserKeyModel>> {
  declare id: CreationOptional<number>
  declare userId: CreationOptional<number> | null
  declare phoneNo: CreationOptional<string> | null
  declare publicKey: string
  declare privateKey: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

UserKeyModel.init({
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
    allowNull: true,
  },
  phoneNo: {
    field: 'phone_no',
    type: DataTypes.STRING,
    allowNull: true,
  },
  publicKey: {
    field: 'public_key',
    type: DataTypes.TEXT,
    allowNull: false,
  },
  privateKey: {
    field: 'private_key',
    type: DataTypes.TEXT,
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
  tableName: 'dp_user_key'
})
