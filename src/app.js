"use strict";

import express, {urlencoded, json} from 'express';
import morgan from 'morgan'
import routes from "./routes/routes";
import * as db from "./middlewares/dbconnection"
import * as errors from './middlewares/errorviews'

const session = require('express-session');
const {join} = require('path');
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

app.use('/', routes)

//static files
app.use(express.static(join(__dirname, '/public')));

//404 cuando no encuentra ninguna de las rutas anteriores
app.use(errors.view404);

//Cuando se produce algun error
app.use(errors.view500);


export default app