import {Router} from 'express';
import * as controller from '../controllers/controller'
import * as check from "../middlewares/islogged";
import * as login from '../controllers/login.controller'

const r = Router();

r.get('/', check.isAuth, controller.MainAsociados);

r.get("/Auth", check.isAuthLogin, controller.AuthView);

r.post('/Auth', [], login.checkLogin)

export default r