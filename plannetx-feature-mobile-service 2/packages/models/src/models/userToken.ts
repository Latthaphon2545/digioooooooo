import { Model, DataTypes, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize'
import { UserModel } from './user'

import { sequelize } from '../sequelize'

export class UserTokenModel extends Model<InferAttributes<UserTokenModel>, InferCreationAttributes<UserTokenModel>> {
  declare id: CreationOptional<number>
  declare userId: number
  declare accessToken: Text
  declare accessTokenExpired: Date
  declare refreshToken: Text
  declare refreshTokenExpired: Date
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

UserTokenModel.init({
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
  accessToken: {
    field: 'access_token',
    type: DataTypes.TEXT,
    allowNull: false,
  },
  accessTokenExpired: {
    field: 'access_token_expired',
    type: DataTypes.DATE,
    allowNull: false,
  },
  refreshToken: {
    field: 'refresh_token',
    type: DataTypes.TEXT,
    allowNull: true,
  },
  refreshTokenExpired: {
    field: 'refresh_token_expired',
    type: DataTypes.DATE,
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
  tableName: 'dp_user_token'
})
