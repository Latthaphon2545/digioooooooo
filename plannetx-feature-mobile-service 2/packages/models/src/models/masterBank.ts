import { Model, DataTypes, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize'

import { sequelize } from '../sequelize'

export class MasterBankModel extends Model<InferAttributes<MasterBankModel>, InferCreationAttributes<MasterBankModel>> {
  declare id: CreationOptional<number>
  declare shortName: string
  declare nameTh: string
  declare nameEn: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

MasterBankModel.init({
  id: {
    field: 'id',
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  shortName: {
    field: 'short_name',
    type: DataTypes.STRING,
    allowNull: false,
  },
  nameTh: {
    field: 'name_th',
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nameEn: {
    field: 'name_en',
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
  tableName: 'dp_master_bank'
})
