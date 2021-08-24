/**
 * @fileoverview Informacion de configuracion
 */
export default {
    APP_TITLE: 'XLX Asamblea',
    APP_SUBTITLE: 'Cooperativa LA ENCARNACION es MICOOPE',
    URL_API: 'http://127.0.0.1:3000',
    DB: {
        USER: process.env.DB_USER || 'asamblea',
        PASSWORD: process.env.DB_PASS || 'As4mbl3@',
        HOST: process.env.DB_HOST || '45.5.118.219',
        DATABASE: process.env.DB_DATABASE || 'PLR0020'
    }

}