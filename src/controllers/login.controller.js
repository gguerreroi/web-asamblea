const passport = require('passport');

export const checkLogin = (request, response, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/',
        failureRedirect: '/Auth',
        failureFlash: true
    })(request, response, next);
}

export const logout = (request, response, next) => {
    request.session.destroy();
    request.logOut();
    response.redirect('/Auth');
}