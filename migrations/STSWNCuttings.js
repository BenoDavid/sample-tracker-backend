'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('STSWNCuttings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            collectionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            inAt: {
                type: Sequelize.DATE,
                allowNull: true
            },
            outAt: {
                type: Sequelize.DATE,
                allowNull: true
            },
            inBy: {
                type: Sequelize.STRING,
                allowNull: true
            },
            outBy: {
                type: Sequelize.STRING,
                allowNull: true
            },
            status: {
                type: Sequelize.STRING,
                allowNull: true
            },
            qty: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0.00
            },
            note: {
                type: Sequelize.TEXT,
                allowNull: true
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('STSWNCuttings');
    }
};
