const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
import config from '../config/config'
const axios = require('axios');

passport.use('local.signin', new passportLocal({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (request, username, password, done) => {

    const URL = `${config.URL_API}/asociados/login`

    await axios.get(URL, {
        data: {
            cui: username,
            cuenta: password
        }
    }).then(function (response) {
        const {state, data} = response.data;
        const {Code, Message} = state;

        console.log(Code, Message);
        request.session.InfoUser = data;

        return done(null, data)
    }).catch(function (error) {
        console.log("error", error)
        return done(null, null);
    })
}));

passport.use('user-local', new passportLocal({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (request, username, password, done) => {

    const URL = `${config.URL_API}/admin/login`

    await axios.get(URL, {
        data: {
            StrUsuario: username,
            StrClave: password
        }
    }).then(function (response) {
        const {state, data} = response.data;
        const {Code, Message} = state;

        console.log(Code, Message);
        request.session.InfoUser = data;

        return done(null, data)
    }).catch(function (error) {
        console.log("error", error)
        return done(null, null);
    })
}));

passport.serializeUser(function (user, done) {

    done(null, user);
})

passport.deserializeUser(async function (request, User, done) {
    // console.log("deserializeUser", User)

    // const {CodCliente, Token} = User;
    done(null, User);
    // const URL = `http://api-poad.inabregion2.org/asociados/${CodEmpleado}`
    // axios.get(`${URL}`,{
    //     headers: {
    //         'x-access-token': `${TokenAuth}`
    //     }
    // }).then(function(response){
    //     let Usuario
    //
    //     if (response.status == 200){
    //         Usuario = response.data.data;
    //         request.session.NombreCompleto = Usuario.NombreCompleto;
    //         request.session.CodRegion = Usuario.CodRegion;
    //         request.session.CodSubRegion = Usuario.CodSubRegion;
    //         request.session.Rol = Usuario.Rol;
    //     }
    //     done(null, User);
    // }).catch(function (error){
    //     console.log("error", error)
    //     done(null, User);
    // })

});
