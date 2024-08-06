import { Migration } from 'sequelize-cli'

export = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dp_user_bank', {
      id: {
        type: Sequelize.INTEGER(),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        references: {
          model: {
            tableName: 'user'
          },
          key: 'id'
        },
      },
      bank_id: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        references: {
          model: {
            tableName: 'master_bank'
          },
          key: 'id'
        },
      },
      bank_account_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      bank_account_name: {
        type: Sequelize.STRING(50),
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
    await queryInterface.dropTable('dp_user_bank')
  }
} satisfies Migration
