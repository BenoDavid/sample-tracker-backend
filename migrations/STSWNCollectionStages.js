'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('STSWNCollectionStages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            collectionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'STSWNCollections',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            stageType: {
                type: Sequelize.STRING, // e.g., 'Fabric', 'Cutting', 'Trim', 'Printing', 'Embroidery', 'Laser'
                allowNull: false
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
                type: Sequelize.STRING, // 'Partial', 'Full'
                allowNull: true
            },
            qtyOut: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0.00
            },
            note: {
                type: Sequelize.TEXT,
                allowNull: true
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('STSWNCollectionStages');
    }
};
