import { Migration } from 'sequelize-cli'

export = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dp_log_bank_integration', {
      id: {
        type: Sequelize.INTEGER(),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      request_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      bank: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      transaction_reference: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      type: {
        type: Sequelize.ENUM(
          'REQUEST',
          'RESPONSE'
        ),
        allowNull: false
      },
      action: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      url: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      header: {
        type: Sequelize.TEXT(),
        allowNull: true
      },
      body: {
        type: Sequelize.TEXT(),
        allowNull: true
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
    await queryInterface.dropTable('dp_log_bank_integration')
  }
} satisfies Migration
