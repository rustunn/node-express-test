import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';

const config = dotenv.config({ path: path.join(__dirname, '../config/.env.dev') });
if (!config) console.log('%s Unable to load configuration file.', chalk.red('✗'));

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', err => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  console.error(err);
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
    console.log('Unable to create user.', err);
    return;
  }
  console.log('User sucessfully created!');
});

app.set('host', process.env.HOST);
app.set('port', process.env.PORT);

app.get('/', (req, res) => {
  UserModel.find({}, (err, results) => {
    if (err) {
      console.log('Unable to get all users.');
      res.status(500);
      res.send(); 
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results));
  });
});

app.listen(app.get('port'), app.get('host'), () => {
  console.log(chalk.green(`✓ Server started on: ${app.get('host')}:${app.get('port')}`));
});
