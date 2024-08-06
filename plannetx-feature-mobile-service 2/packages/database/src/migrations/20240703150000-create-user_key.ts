import { Migration } from 'sequelize-cli'

export = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dp_user_key', {
      id: {
        type: Sequelize.INTEGER(),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER(),
        allowNull: true,
      },
      phone_no: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      public_key: {
        type: Sequelize.TEXT(),
        allowNull: false,
      },
      private_key: {
        type: Sequelize.TEXT(),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE(),
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE(),
        allowNull: false
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('dp_user_key')
  }
} satisfies Migration
