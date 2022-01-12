const Tought = require('../models/Tought')
const User = require('../models/User')
const { Op } = require('sequelize')

module.exports = class ToutghtController {
    static async getAll(req, res) {
        let search = ''
        if (req.query.search)
            search = req.query.search

        let order = 'DESC'
        if (req.query.order === 'old')
            order = 'ASC'
        else
            order = 'DESC'

        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: { [Op.like]: `%${search}%` }
            },
            order: [['createdAt', order]]
        })
        const toughts = toughtsData.map(result => result.get({ plain: true }))
        let toughtQty = toughts.length
        if (toughtQty === 0)
            toughtQty = false

        res.render('toughts/home', { toughts, search, toughtQty })
    }
    static async dashboard(req, res) {
        const userId = req.session.userid

        const user = await User.findOne({ where: { id: userId }, include: Tought, plain: true })
        //check if user existes
        if (!user) {
            res.redirect('/login')
        }

        const toughts = user.toughts.map(result => result.dataValues)
        let emptyTougths = false
        if (toughts.length === 0)
            emptyTougths = true

        res.render('toughts/dashboard', { toughts, emptyTougths })
    }

    static creatTougth(req, res) {
        res.render('toughts/create')
    }
    static async creatTougthPost(req, res) {
        const tought = {
            title: req.body.title,
            userId: req.session.userid
        }
        //check if user existes
        const user = await User.findOne({ where: { id: tought.userId } })
        if (!user) {
            res.redirect('/login')
        }

        try {
            await Tought.create(tought)
            req.flash('message', 'Pesamento criado com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (err) {
            console.log('Aconteceu um erro' + err)
        }

    }

    static async removeTougth(req, res) {
        const id = req.body.id
        const userId = req.session.userid
        try {
            await Tought.destroy({ where: { id: id, userId: userId } })
            req.flash('message', 'Pesamento removido com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (err) {
            console.log('Aconteceu um erro: ' + err)
        }
    }

    static async updateTougth(req, res) {
        const id = req.params.id
        const tought = await Tought.findOne({ where: { id: id }, raw: true })
        res.render('toughts/edit', { tought })
    }
    static async updateTougthPost(req, res) {
        const id = req.body.id
        const tought = {
            title: req.body.title
        }

        try {
            await Tought.update(tought, { where: { id: id } })
            req.flash('message', 'Pesamento atualizado com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (err) {
            console.log('Aconteceu um erro: ' + err)
        }
    }

}