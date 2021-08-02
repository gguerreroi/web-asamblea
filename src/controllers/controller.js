
export const AuthView = (request, response) => {
    response.render('./asociados/login')
}

export const MainAsociados = (request, response) => {

    response.render('./asociados/main',{user: request.session.InfoUser})
}