'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('UngTuyens', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            fullName: {
                type: Sequelize.STRING,
            },
            birthDay: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            keHoach: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.STRING,
            },
            file: {
                type: Sequelize.TEXT('long'),
            },
            note: {
                type: Sequelize.STRING,
            },
            cccd: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('UngTuyens');
    },
};
