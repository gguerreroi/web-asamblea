"use strict";

import express, {urlencoded, json} from 'express';
import morgan from 'morgan'
import defaults from './config/config'
import routes from "./routes/routes";
import * as db from "./middlewares/dbconnection"


const session = require('express-session');

const {join} = require('path');
const favicon = require('serve-favicon');


const passport = require('passport');

require('./middlewares/passport')

const app = express();

// initalize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);


//Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs');
app.set('views', join(__dirname, '/views'));

//Middlewares
app.use(morgan('combined'));
app.use(urlencoded({extended: true}));
app.use(json());
app.use(session({
    secret: 'bo7u0Z2wPeNqTOIA',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: db.dbConnection
    })
}));


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
app.use(express.static(join(__dirname, '/public')));

//404 cuando no encuentra ninguna de las rutas anteriores
app.use(function (req, res, next) {
    res.status(404).render('./system/error404');
});

//Cuando se produce algun error
app.use(function (req, res, next) {

    res.status(500).render('./system/error500');
});


export default app