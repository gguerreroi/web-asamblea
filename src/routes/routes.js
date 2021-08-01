import {Router} from 'express';
import * as controller from '../controllers/controller'
import * as check from "../middlewares/islogged";


const r = Router();

r.get('/',
    check.isAuth,
    controller.MainAsociados);

r.get(
    "/Auth",
    check.isAuthLogin,
    controller.AuthView);


export default r