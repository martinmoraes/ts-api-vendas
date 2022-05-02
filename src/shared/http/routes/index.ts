import productsRouter from '@modules/produtcts/routes/products.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/products', productsRouter);

export default routes;
