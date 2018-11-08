import express from 'express';
import businesses from './business';
import users from './users';

const routes = express.Router();

routes.use('/users', users);
routes.use('/businesses', businesses);

export default routes;
