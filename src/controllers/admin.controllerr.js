import passport from "passport";
import config from '../config/config'
import axios from "axios";

export const Authview = (request, response) => {
    response.render('./administrador/login')
}
export const checkLogin = (request, response, next) => {
    passport.authenticate('user-local', {
        successRedirect: '/admin',
        failureRedirect: '/admin/Auth',
        failureFlash: true
    })(request, response, next);
}
export const main = (request, response) => {
    response.render('./administrador/main')
}

export const votaciones = (request, response) => {
    response.render('./administrador/votaciones')
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
    response.render('./administrador/sexo')
}

export const resultado = (request, response) => {
    response.render('./administrador/resultados')
}