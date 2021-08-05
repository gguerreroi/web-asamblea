import passport from "passport";
import config from '../config/config'
import axios from "axios";

let options = {
    title: `${config.APP_TITLE}`,
    subtitle: `${config.APP_SUBTITLE}`
}
export const Authview = (request, response) => {
    response.render('./administrador/login', options)
}
export const checkLogin = (request, response, next) => {
    passport.authenticate('user-local', {
        successRedirect: '/admin',
        failureRedirect: '/admin/Auth',
        failureFlash: true
    })(request, response, next);
}
export const main = (request, response) => {
    options.path = request.route.path
    response.render('./administrador/main', options)
}

export const votaciones = (request, response) => {
    options.path = request.route.path
    response.render('./administrador/votaciones', options)
}

export const asistencia = (request, response) => {
    axios({
        url: ``,
        method: 'GET',

    }).then(data => {
        const options = {
            app_title: config.app_title,
            app_subtitle: config.app_subtitle
        }
        response.render('./administrador/asistencia', options)
    }).catch(reason => {

    })
}

export const sexo = (request, response) => {
    options.path = request.route.path
    response.render('./administrador/sexo', options)
}

export const resultado = (request, response) => {
    options.path = request.route.path
    response.render('./administrador/resultados', options)
}