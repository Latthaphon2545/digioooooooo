import { Model, DataTypes, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize'

import { sequelize } from '../sequelize'

export class VersionModel extends Model<InferAttributes<VersionModel>, InferCreationAttributes<VersionModel>> {
  declare id: CreationOptional<number>
  declare version: string
  declare isPass: CreationOptional<boolean>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

VersionModel.init({
  id: {
    field: 'id',
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  isPass: {
    field: 'is_pass',
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  version: {
    field: 'version',
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
  tableName: 'dp_version'
})
