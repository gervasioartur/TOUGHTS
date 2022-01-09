const Tought  =  require('../models/Tought')
const User = require('../models/User')

module.exports =  class ToutghtController{
    static async getAll(req,res){
        res.render('toughts/home')
    }
}