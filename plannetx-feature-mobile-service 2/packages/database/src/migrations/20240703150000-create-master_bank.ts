import { Migration } from 'sequelize-cli'

export = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dp_master_bank', {
      id: {
        type: Sequelize.INTEGER(),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      short_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      name_th: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      name_en: {
        type: Sequelize.STRING(255),
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
    await queryInterface.dropTable('dp_master_bank')
  }
} satisfies Migration
