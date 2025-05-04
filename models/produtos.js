const { Sequelize, sequelize } = require('../db/conn');

const produtos = sequelize.define("produtos", {
    id_produto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    valor : {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    codigoBarras: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
}, {
    tableName: 'produtos',
    timestamps: false
});

module.exports = produtos;
