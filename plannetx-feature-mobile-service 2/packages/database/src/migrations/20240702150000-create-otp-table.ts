import { Migration } from 'sequelize-cli'

export = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dp_otp', {
      id: {
        type: Sequelize.INTEGER(),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      phone_no: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      otp: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      reference: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      is_pass: {
        type: Sequelize.BOOLEAN(),
        allowNull: false,
      },
      attempt: {
        type: Sequelize.INTEGER(),
        allowNull: false,
      },
      expired_at: {
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
    await queryInterface.dropTable('dp_otp')
  }
} satisfies Migration
