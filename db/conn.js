const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("aula_terca_feira", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(() => {
    console.log("bd conectado")
}).catch( err => {
    console.log(`Erro: ${err}`)
});

module.exports = {
    sequelize, Sequelize
};