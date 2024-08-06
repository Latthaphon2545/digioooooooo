import 'sequelize'

declare module 'sequelize' {
  export interface ModelAttributeColumnOptions {
    after?: string
  }
}
