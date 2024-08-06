import { Migration } from 'sequelize-cli'

export = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dp_user', {
      id: {
        type: Sequelize.INTEGER(),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      uid: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      title_name_th: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      first_name_th: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      last_name_th: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      title_name_en: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      first_name_en: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      last_name_en: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      phone_no: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(
          'ACTIVE',
          'INACTIVE'
        ),
        allowNull: false,
      },
      pin: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      device: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(55),
        allowNull: true,
      },
      citizen_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      passport_number: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      alien_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      post_code: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      occupation: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      country_of_income: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      country_code: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      province: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      birth_date: {
        type: Sequelize.DATEONLY(),
        allowNull: true,
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

    await queryInterface.addIndex('dp_user', ['uid'], {
      name: 'idx_dp_user_uid',
      unique: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('dp_user', 'idx_dp_user_uid');
    await queryInterface.dropTable('dp_user')
  }
} satisfies Migration
