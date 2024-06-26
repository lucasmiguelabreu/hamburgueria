import { Router } from 'express';

import { CreateUserController } from "./controllers/user/CreateUserControler"
import { AuthUserController } from './controllers/AuthUserController'
import { DetailUserController } from "./controllers/user/DetailUserController"
import {isAuthenticated} from "./middleware/isAuthenticated"
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController';

const router = Router();

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)


//-- ROTAS CATEGORY

router.post('/category', isAuthenticated, new CreateCategoryController().handle )

router.get('/category', isAuthenticated, new ListCategoryController().handle )

export { router };