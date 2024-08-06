import { Migration } from 'sequelize-cli'

export = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.insert(null, 'dp_running_number', { type: 'WALLET', number: 0, created_at: new Date(), updated_at: new Date() })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.delete(null, 'dp_running_number', { type: 'WALLET' })
  }
} satisfies Migration
