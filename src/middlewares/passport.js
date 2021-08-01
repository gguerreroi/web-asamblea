import app from "../app"

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const axios = require('axios');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (request, username, password, done) => {

    const URL = `${app.locals.UrlApi}/v1/Login`

    await axios.get(URL,{
        auth: {
            username: username,
            password: password
        }
    }).then(function(response){
        const {state, data} = response.data;
        const {Code, Message} = state;
        const {CodEmpleado, NombreCompleto, Usuario, Token, Rol, CodRegion, CodSubRegion} = data;
        console.log(Code, Message);
        request.session.CodEmpleado = CodEmpleado;
        request.session.NombreCompleto = NombreCompleto;
        request.session.UserAuth = Usuario;
        request.session.TokenAuth = Token;
        request.session.Rol = Rol;
        request.session.CodRegion = CodRegion;
        request.session.CodSubRegion = CodSubRegion;
        const User = {
            TokenAuth: Token,
            UserAuth: Usuario,
            CodEmpleado: CodEmpleado,
            NombreCompleto: NombreCompleto,
            Rol: Rol,
            CodRegion: CodRegion,
            CodSubRegion: CodSubRegion
        }

        return done(null, User, request.flash('success', Token))
    }).catch(function(error){
        console.log("error", error)
        return done(null, null, request.flash('message', 'El usuario o contraseña no es Correcto'));
    })
}));

passport.serializeUser(function(user, done){
    // console.log("serializeUser", user);
    done(null, user);
})

passport.deserializeUser(async function(request, User, done){
    // console.log("deserializeUser", User)

    const {CodEmpleado, TokenAuth} = User;

    const URL = `http://api-poad.inabregion2.org/v1/Usuarios/${CodEmpleado}`
    axios.get(`${URL}`,{
        headers: {
            'x-access-token': `${TokenAuth}`
        }
    }).then(function(response){
        let Usuario

        if (response.status == 200){
            Usuario = response.data.data;
            request.session.NombreCompleto = Usuario.NombreCompleto;
            request.session.CodRegion = Usuario.CodRegion;
            request.session.CodSubRegion = Usuario.CodSubRegion;
            request.session.Rol = Usuario.Rol;
        }
        done(null, User);
    }).catch(function (error){
        console.log("error", error)
        done(null, User);
    })

});