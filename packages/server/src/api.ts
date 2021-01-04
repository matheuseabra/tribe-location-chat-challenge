import express, { Application } from 'express';
import http, { Server } from 'http';
import cors from 'cors';
import routes from './app/routes';
import { setupWebSocket } from './web-socket';
import 'dotenv/config';
import './database';

class Api {
  public api: Application;

  public server: Server;

  constructor() {
    this.api = express();
    this.middlewares();

    this.server = http.createServer(this.api);

    setupWebSocket(this.server);
  }

  middlewares() {
    this.api.use(cors());
    this.api.use(express.json());
    this.api.use(routes);
  }
}

export default new Api();
