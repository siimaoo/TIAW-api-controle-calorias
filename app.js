import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: './config/.env'});

import userRoutes from './routes/user.routes';
import itemsRoutes from './routes/items.routes';
import recipeRoutes from './routes/recipe.routes';

import automatedTasks from './controllers/automated-tasks.controller';

class App {
  constructor() {
    this.express = express();
    this.database();
    this.middlewares();
    this.routes();
    this.crons();
  }

  database() {
    mongoose.connect(process.env.DATABASE, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  middlewares() {
    this.express.use((req, res, next) => {
      res.set({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, x-access-token'
      })
      next();
    });
    
    this.express.use(express.json());
  }

  routes() {
    this.express.use(userRoutes);
    this.express.use(itemsRoutes);
    this.express.use(recipeRoutes);
  }

  crons() {
    automatedTasks.resetCalories();
  }
}

export default new App().express;