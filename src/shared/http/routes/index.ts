import productsRouter from '@modules/produtcts/routes/products.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import SessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', SessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
