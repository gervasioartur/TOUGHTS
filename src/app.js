const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStrore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

//importing controllers
const ToutghtsController = require('./app/controllers/ToutghtController')

//importing routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')


//cofiguring handlebars and url encoded
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname, '../public/')))
app.set('views', path.join(__dirname, 'app/views'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//configuring session
app.use(session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStrore({
        logFn: function () { },
        path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now + 360000),
        httpOnly: true

    }
}))

//cofiguring flash messages
app.use(flash())

//saving the answer sessions
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }
    next()
})

//setting routes
app.use('/toughts', toughtsRoutes)
app.get('/', ToutghtsController.getAll)
//authRoutes
app.use('/', authRoutes)

module.exports = app