"use strict";

import express, {urlencoded, json} from 'express';
import morgan from 'morgan'
import defaults from './middlewares/defaultValues'
import routes from "./routes/routes";
const session = require('express-session');
const flash = require('connect-flash');
const {join} = require('path');
const favicon = require('serve-favicon');

const Sequelize = require('sequelize');
const passport = require('passport');

const app = express();

// initalize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('./middlewares/passport');

let sequelize = new Sequelize({
    dialect: 'mssql',
    host: '45.5.118.219',
    username: 'inab_session',
    password: 'inab_session',
    database: 'INAB001'
});

//Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs');
app.set('views', join(__dirname, '/Views'));

//Middlewares
app.use(morgan('combined'));
app.use(urlencoded({extended: true}));
app.use(json());
app.use(session({
    secret: 'bo7u0Z2wPeNqTOIA',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Variables Globales
app.use((req, res, next) => {
    //app.locals.user = req.user; //app.locals.{varname} = req.flash('{varname}');
    //app.locals.pass = req.pass;
    app.locals.UrlApi = `${defaults.URL_API}`;
    app.locals.tokenAuth = "";
    next();
});

app.use('/', routes)

//static files
app.use(express.static(join(__dirname, '/Public')));

//404 cuando no encuentra ninguna de las rutas anteriores
app.use(function (req, res, next) {
    res.status(404).render('./system/error404');
});

//Cuando se produce algun error
app.use(function (req, res, next) {

    res.status(500).render('./system/error500');
});


export default app