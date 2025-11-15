'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('STSWNCollections', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            swnNo: {
                type: Sequelize.STRING,
                allowNull: false
            },
            style: {
                type: Sequelize.STRING
            },
            season: {
                type: Sequelize.STRING
            },
            buyer: {
                type: Sequelize.STRING
            },
            supplier: {
                type: Sequelize.STRING
            },
            createdBy: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('STSWNCollections');
    }
};
