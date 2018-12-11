import express from 'express';
import businesses from './business';
import users from './users';

const routes = express.Router();

routes.use('/user', users);
/* routes.use('/business', businesses); */

export default routes;