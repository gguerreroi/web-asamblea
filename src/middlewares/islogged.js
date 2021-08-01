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