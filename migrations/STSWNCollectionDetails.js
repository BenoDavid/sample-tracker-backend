'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('STSWNCollectionDetails', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            sampleId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'STSWNCollections',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            sampleType: {
                type: Sequelize.STRING
            },
            color: {
                type: Sequelize.STRING
            },
            sizeList: {
                type: Sequelize.STRING
            },
            indentRemarks: {
                type: Sequelize.TEXT
            },
            myRequiredDate: {
                type: Sequelize.DATE
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('STSWNCollectionDetails');
    }
};
