import config from '../config/config'

let options = {
    title: `${config.APP_TITLE}`,
    subtitle: `${config.APP_SUBTITLE}`
}

export const AuthView = (request, response) => {

    response.render('./asociados/login', options)
}

export const MainAsociados = (request, response) => {
    options.user = request.session.InfoUser
    response.render('./asociados/main', options)
}