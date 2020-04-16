import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: './config/.env'});

import userRoutes from './routes/user.routes';
import itemsRoutes from './routes/items.routes';

class App {
  constructor() {
    this.express = express();
    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    mongoose.connect(process.env.DATABASE, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }

  middlewares() {
    this.express.use((req, res, next) => {
      res.set({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type'
      })
      next();
    });
    
    this.express.use(express.json());
  }

  routes() {
    this.express.use(userRoutes);
    this.express.use(itemsRoutes);
  }
}

export default new App().express;