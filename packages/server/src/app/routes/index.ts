import { Router } from 'express';
import messageRoutes from './message';

class Routes {
  public routes: Router;

  constructor() {
    this.routes = Router();
    this.matchRoutes();
  }

  matchRoutes() {
    this.routes.use('/messages', messageRoutes);
  }
}

export default new Routes().routes;
