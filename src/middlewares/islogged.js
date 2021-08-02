export const isAuth = (request, response, next) => {
    if (request.isAuthenticated())
        return next()
    return response.redirect('/Auth')

}

export const isAuthLogin = (request, response, next) => {
    if (request.isAuthenticated())
        return response.redirect('/');

    return next();
}

export const isAuthAdmin = (request, response, next) => {
    if (request.isAuthenticated())
        return next()
    return response.redirect('/admin/Auth')
}

export const isAuthLoginAdmin = (request, response, next) => {
    if (request.isAuthenticated())
        return response.redirect('/admin');

    return next();
}