import {Router} from 'express';
import * as controller from '../controllers/controller'
import * as check from "../middlewares/islogged";
import * as login from '../controllers/login.controller'
import * as admin from '../controllers/admin.controllerr'
import {Authview, checkLogin} from "../controllers/admin.controllerr";
import {isAuthLoginAdmin} from "../middlewares/islogged";
const r = Router();

r.get('/', check.isAuth, controller.MainAsociados);
r.get("/Auth", check.isAuthLogin, controller.AuthView);
r.post('/Auth', [], login.checkLogin)
r.get('/logout', [], login.logout)

/*
* Rutas de Administrador
 */

r.get('/admin/', check.isAuthAdmin, admin.main)
r.get('/admin/Auth', check.isAuthLoginAdmin,  admin.Authview)
r.post('/admin/Auth', [],  admin.checkLogin)
r.get('/admin/votaciones', check.isAuthAdmin, admin.votaciones)
r.get('/admin/asistencia', check.isAuthAdmin, admin.asistencia)
r.get('/admin/sexo', check.isAuthAdmin, admin.sexo)
r.get('/admin/resultado', check.isAuthAdmin, admin.resultado)

export default r
