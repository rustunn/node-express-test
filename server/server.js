import path from 'path';
import fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import logger from './logger.js';

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
const config = dotenv.config({ path: path.join(__dirname, '../config/.env.dev') });
if (!config) logger.error('Unable to load configuration file.');

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', err => {
  logger.error('MongoDB connection error. Please make sure MongoDB is running.',  err);
  process.exit();
});

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, trim: true, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchema);

const user = new UserModel({
  email: '111',
  password: '111',
});

user.save(err => {
  if (err) {
    logger.error('Unable to create new user in MongoDB', err);
    return;
  }
  logger.info('New User sucessfully created in MongoDB');
});

app.set('host', process.env.HOST);
app.set('port', process.env.PORT);

app.use(morgan('combined', { stream: logger.stream }));

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

app.listen(app.get('port'), app.get('host'), () => {
  logger.info(`Server started successfully on: ${app.get('host')}:${app.get('port')}`);
});
