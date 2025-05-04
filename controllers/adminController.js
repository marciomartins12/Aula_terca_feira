const produtos = require('../models/produtos');

module.exports = class AdminController {
    static async home(req, res){
      
        res.send("<h1>esperando o front agora pra desenvolveer o resto</h1>")
    }
}