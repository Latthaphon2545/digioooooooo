import { Migration } from 'sequelize-cli'

export = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.insert(null, 'master_bank', { short_name: 'SCB', name_th: 'ธนาคารไทยพาณิชย์ จำกัด (มหาชน)', name_en: 'The Siam Commercial Bank Public Company Limit', created_at: new Date(), updated_at: new Date() })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.delete(null, 'master_bank', { short_name: 'SCB' })
  }
} satisfies Migration
