import path from 'path';
import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import { connectDB } from './utils/mongo';
import logger from './utils/logger.js';
import { createUserValidations, createUser } from './api/v1/user/post.js';


/**
 * Create logs directory if it does not exist
 */
const logsDir = 'logs'; // should be the same as directory specified in logger.js
if (!fs.existsSync(logsDir)){
  fs.mkdirSync(logsDir);
}


/**
 * Read configurations
 */
const config = dotenv.config({ path: path.join(__dirname, '../../config/.env.dev') });
if (!config) logger.error('Unable to load configuration file.');


/**
 * Connect MongoDB
 */
connectDB();


/**
 * Initialize and configure the app
 */
const app = express();

app.set('host', process.env.HOST);
app.set('port', process.env.PORT);

app.use(compression());
app.use(morgan('combined', { stream: logger.stream }));
app.use(bodyParser.json());

app.disable('x-powered-by');


/**
 * Define APIs
 */
app.post('/api/v1/user', createUserValidations, createUser);

app.get('/', (req, res) => {
  UserModel.find({}, (err, results) => {
    if (err) {
      logger.error('Unable to get all users.');
      res.status(500);
      res.send(); 
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results));
  });
});


/**
 * Run the app
 */
app.listen(app.get('port'), app.get('host'), () => {
  logger.info(`Server started successfully on: ${app.get('host')}:${app.get('port')}`);
});
