'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('STSWNCollectionQtys', {
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
            serialNo: { type: Sequelize.STRING, allowNull: false },

            // Line and operator info
            line: { type: Sequelize.STRING, allowNull: true },
            operator: { type: Sequelize.STRING, allowNull: true },
            operatorAssignedBy: { type: Sequelize.STRING, allowNull: true },
            lineInTime: { type: Sequelize.DATE, allowNull: true },
            lineOutTime: { type: Sequelize.DATE, allowNull: true },
            lostMinutes: { type: Sequelize.INTEGER },
            lostMinRemark: { type: Sequelize.TEXT, allowNull: true },

            // Stitch process
            stitchOutTime: { type: Sequelize.DATE, allowNull: true },
            stitchOutBy: { type: Sequelize.STRING, allowNull: true },

            // QC process
            qcStatus: { type: Sequelize.STRING, allowNull: true }, // e.g., 'Pending', 'Pass', 'Fail'
            qcBy: { type: Sequelize.STRING, allowNull: true },
            qcNote: { type: Sequelize.TEXT, allowNull: true },

            // CFT process
            cftOutTime: { type: Sequelize.DATE, allowNull: true },
            cftStatus: { type: Sequelize.STRING, allowNull: true },
            cftOutBy: { type: Sequelize.STRING, allowNull: true },
            cftNote: { type: Sequelize.TEXT, allowNull: true },
            data: { type: Sequelize.TEXT },

        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('STSWNCollectionQtys');
    }
};
