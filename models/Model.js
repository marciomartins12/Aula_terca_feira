const { Sequelize, sequelize } = require('../db/conn');

const model = sequelize.define("model", {
    id_model: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    user_name: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    last_login: {
        type: Sequelize.DATE,
        allowNull: true
    }
    ,

}, {
    tableName: 'model',
    timestamps: false
});

module.exports = model;
