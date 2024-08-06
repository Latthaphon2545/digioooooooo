import { Migration } from 'sequelize-cli'

export = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dp_user_token', {
      id: {
        type: Sequelize.INTEGER(),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER(),
        allowNull: false,
      },
      access_token: {
        type: Sequelize.TEXT(),
        allowNull: false,
      },
      access_token_expired: {
        type: Sequelize.DATE(),
        allowNull: false,
      },
      refresh_token: {
        type: Sequelize.TEXT(),
        allowNull: false,
      },
      refresh_token_expired: {
        type: Sequelize.DATE(),
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
    await queryInterface.dropTable('dp_user_token')
  }
} satisfies Migration
