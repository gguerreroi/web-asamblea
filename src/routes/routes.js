import {Router} from 'express';
import * as controller from '../controllers/controller'
import * as check from "../middlewares/islogged";
import * as login from '../controllers/login.controller'
import * as admin from '../controllers/admin.controllerr'
const r = Router();

r.get('/', check.isAuth, controller.MainAsociados);

r.get("/Auth", check.isAuthLogin, controller.AuthView);

r.post('/Auth', [], login.checkLogin)

r.get('/logout', [], login.logout)

/*
* Rutas de Administrador
 */

r.get('/admin/Auth', [],  admin.login)
r.get('/admin/', [], admin.main)
export default r
