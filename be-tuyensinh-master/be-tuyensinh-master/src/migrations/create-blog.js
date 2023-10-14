'use strict';

const { STRING } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Blogs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            thumbnail: {
                type: Sequelize.STRING,
            },
            title: {
                type: Sequelize.STRING,
            },
            file: {
                type: Sequelize.TEXT('long'),
            },
            contentHTML: {
                type: Sequelize.TEXT('long'),
            },
            contentMarkdown: {
                type: Sequelize.TEXT('long'),
            },
            slug: {
                type: STRING,
                unique: true,
                allowNull: false,
            },
            type: {
                type: STRING,
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Blogs');
    },
};
