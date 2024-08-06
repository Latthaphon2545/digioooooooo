import { Model, DataTypes, type InferAttributes, type InferCreationAttributes, type CreationOptional, NonAttribute } from 'sequelize'

import { sequelize } from '../sequelize'

import { UserBankModel } from './userBank'

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  declare id: CreationOptional<number>
  declare uid: string
  declare titleNameTh: CreationOptional<string>
  declare firstNameTh: CreationOptional<string>
  declare lastNameTh: CreationOptional<string>
  declare titleNameEn: CreationOptional<string>
  declare firstNameEn: CreationOptional<string>
  declare lastNameEn: CreationOptional<string>
  declare phoneNo: string
  declare status: UserStatus
  declare pin: string
  declare device: string
  declare citizenId: CreationOptional<string>
  declare passportNumber: CreationOptional<string>
  declare alienId: CreationOptional<string>
  declare birthDate: CreationOptional<string>
  declare email: CreationOptional<string>
  declare countryCode: CreationOptional<string>
  declare address: CreationOptional<string>
  declare province: CreationOptional<string>
  declare postCode: CreationOptional<string>
  declare occupation: CreationOptional<string>
  declare countryOfIncome: CreationOptional<string>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  declare userBank: NonAttribute<UserBankModel[]>
}

UserModel.init({
  id: {
    field: 'id',
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  uid: {
    field: 'uid',
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  titleNameTh: {
    field: 'title_name_th',
    type: DataTypes.STRING,
    allowNull: true,
  },
  firstNameTh: {
    field: 'first_name_th',
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastNameTh: {
    field: 'last_name_th',
    type: DataTypes.STRING,
    allowNull: true,
  },
  titleNameEn: {
    field: 'title_name_en',
    type: DataTypes.STRING,
    allowNull: true,
  },
  firstNameEn: {
    field: 'first_name_en',
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastNameEn: {
    field: 'last_name_en',
    type: DataTypes.STRING,
    allowNull: true,
  },
  citizenId: {
    field: 'citizen_id',
    type: DataTypes.STRING,
    allowNull: true,
  },
  passportNumber: {
    field: 'passport_number',
    type: DataTypes.STRING,
    allowNull: true,
  },
  alienId: {
    field: 'alien_id',
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthDate: {
    field: 'birth_date',
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  phoneNo: {
    field: 'phone_no',
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    field: 'status',
    type: DataTypes.ENUM(),
    values: Object.values(UserStatus),
    defaultValue: UserStatus.ACTIVE,
    allowNull: false,
  },
  pin: {
    field: 'pin',
    type: DataTypes.STRING,
    allowNull: false
  },
  device: {
    field: 'device',
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    field: 'email',
    type: DataTypes.STRING,
    allowNull: true,
  },
  countryCode: {
    field: 'country_code',
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    field: 'address',
    type: DataTypes.STRING,
    allowNull: true,
  },
  province: {
    field: 'province',
    type: DataTypes.STRING,
    allowNull: true,
  },
  postCode: {
    field: 'post_code',
    type: DataTypes.STRING,
    allowNull: true,
  },
  occupation: {
    field: 'occupation',
    type: DataTypes.STRING,
    allowNull: true,
  },
  countryOfIncome: {
    field: 'country_of_income',
    type: DataTypes.STRING,
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
  tableName: 'dp_user'
})
